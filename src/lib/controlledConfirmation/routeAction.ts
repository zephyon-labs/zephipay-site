import type { SessionData } from "@auth0/nextjs-auth0/types";
import type { WebCall } from "./sdkFlow";
import { toWebSession, webSessionReference } from "./session";
import { webUuid, type HandoffBody } from "./handoffContract";
import { validateRuntimeResult, type ControlledRuntimeAction, type ControlledRuntimeResult } from "./runtimeContract";

/** The mounted BFF route's authority-loading ports are server composition, never body fields. */
export async function controlledRouteAction(request: Request, id: string, ports: {
  enabled: boolean; trustedOrigin: (request: Request)=>boolean;
  session: ()=>Promise<SessionData|null>; call: WebCall;
  runtime?: (action: ControlledRuntimeAction, body: HandoffBody)=>Promise<ControlledRuntimeResult>;
}) {
  const headers={"Cache-Control":"private, no-store"};
  if(!ports.enabled)return Response.json({error:"Unavailable."},{status:404,headers});
  if(request.method!=="POST")return Response.json({error:"Method not allowed."},{status:405,headers});
  if(!request.headers.get("origin") || !ports.trustedOrigin(request))return Response.json({error:"Invalid origin."},{status:403,headers});
  const session=await ports.session();if(!session)return Response.json({error:"Sign in required."},{status:401,headers});
  if(!webUuid(id))return Response.json({error:"Invalid payment."},{status:400,headers});
  if(!webSessionReference(session))return Response.json({paymentId:id,state:"SESSION_CHANGED"},{headers});
  try {
    // Reject oversized bodies while streaming, before materializing arbitrary browser input.
    const reader=request.body?.getReader();if(!reader)throw new Error();
    const chunks:Uint8Array[]=[];let size=0;
    for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>100){await reader.cancel();throw new Error();}chunks.push(value);}
    const input=JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if(Object.keys(input).join()!=="action" || !["prepare","recover","confirm","runtime-evaluate","runtime-recover"].includes(input.action))throw new Error();
    if(input.action==="runtime-evaluate" || input.action==="runtime-recover") {
      if(!ports.runtime)return Response.json({error:"Unavailable."},{status:404,headers});
      const result=validateRuntimeResult(await ports.runtime(input.action,{paymentId:id,session:toWebSession(session)}));
      if(result.paymentId!==id)throw new Error();
      return Response.json(result,{headers});
    }
    return Response.json(await ports.call(input.action,{paymentId:id,session:toWebSession(session)}),{headers});
  } catch {return Response.json({error:"Recover confirmation state. If your session changed, sign in again."},{status:409,headers});}
}
