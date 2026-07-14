import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/utils/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "glass"
  | "link";

type ButtonSize = "sm" | "md" | "lg" | "icon";

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  "aria-label"?: string;
};

type NativeButtonProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedButtonProps> & {
    href?: never;
    external?: never;
  };

type LinkButtonProps = SharedButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedButtonProps> & {
    href: string;
    external?: boolean;
    disabled?: boolean;
  };

export type ButtonProps = NativeButtonProps | LinkButtonProps;

const baseClasses =
  "zephipay-button-motion inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-[#65B8FF]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070A] disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[#73E7FF]/30 bg-[#65B8FF] text-[#05070A] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_30px_rgba(101,184,255,0.18)] hover:-translate-y-0.5 hover:bg-[#7CC3FF] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_14px_38px_rgba(101,184,255,0.28)] active:translate-y-0",
  secondary:
    "border border-white/10 bg-[#121C28] text-[#F4F8FC] shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:border-white/16 hover:bg-[#172434] active:translate-y-0",
  outline:
    "border border-white/14 bg-transparent text-[#F4F8FC] hover:-translate-y-0.5 hover:border-[#73E7FF]/32 hover:bg-white/[0.04] active:translate-y-0",
  ghost:
    "border border-transparent bg-transparent text-[#AAB8C7] hover:bg-white/[0.05] hover:text-[#F4F8FC]",
  glass:
    "border border-white/12 bg-white/[0.05] text-[#F4F8FC] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-[#73E7FF]/24 hover:bg-white/[0.08] active:translate-y-0",
  link:
    "rounded-none border-0 bg-transparent p-0 text-[#65B8FF] hover:text-[#73E7FF]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm sm:text-base",
  lg: "h-13 px-7 text-base",
  icon: "h-11 w-11 p-0",
};

function ButtonContent({
  children,
  loading,
  leftIcon,
  rightIcon,
}: Pick<
  SharedButtonProps,
  "children" | "loading" | "leftIcon" | "rightIcon"
>) {
  return (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : (
        leftIcon
      )}

      <span>{children}</span>

      {!loading && rightIcon}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    ...rest
  } = props;

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in props && props.href) {
    const {
      href,
      external = false,
      disabled = false,
      ...anchorProps
    } = rest as LinkButtonProps;

    const sharedLinkProps = {
      className: cn(
        classes,
        disabled && "pointer-events-none opacity-50",
      ),
      "aria-disabled": disabled || undefined,
      tabIndex: disabled ? -1 : anchorProps.tabIndex,
    };

    if (external) {
      return (
        <a
          {...anchorProps}
          {...sharedLinkProps}
          href={href}
          target={anchorProps.target ?? "_blank"}
          rel={anchorProps.rel ?? "noreferrer"}
        >
          <ButtonContent
            loading={loading}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
          >
            {children}
          </ButtonContent>
        </a>
      );
    }

    return (
      <Link {...anchorProps} {...sharedLinkProps} href={href}>
        <ButtonContent
          loading={loading}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        >
          {children}
        </ButtonContent>
      </Link>
    );
  }

  const buttonProps = rest as NativeButtonProps;

  return (
    <button
      {...buttonProps}
      className={classes}
      disabled={buttonProps.disabled || loading}
      type={buttonProps.type ?? "button"}
    >
      <ButtonContent
        loading={loading}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      >
        {children}
      </ButtonContent>
    </button>
  );
}