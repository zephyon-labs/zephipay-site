# Personal multi-flow production smoke test

## Send

1. Sign in and open `/personal#personal-workspace`.
2. Select **Send** and confirm Recipient, Amount, and Purpose (optional) are immediately visible.
3. Enter a valid exact ZephiPay username and `2` USDC; leave Purpose blank.
4. Select **Review payment** and confirm the same panel shows the resolved identity, verification status, and amount without navigation.
5. Select **Back** and verify all entered values remain, then return to review.
6. Select **Send payment** once and verify there is no second visible confirmation.
7. Observe queued/processing/pending status from authoritative polling, then settlement and the durable receipt.
8. Verify the receipt omits Purpose, activity refreshes, and refreshing the recovery URL restores authoritative state.

## Request

1. Select **Request** and enter a valid exact payer identity, a positive amount, and an optional Purpose.
2. Select **Review request** and verify the resolved payer, verification status, amount, and supplied Purpose.
3. Select **Back** and verify values remain, then select **Send request**.
4. Verify **Request sent** displays authoritative pending state without settlement or receipt language.
5. Verify recent Request activity shows the correct sent/received direction and backend lifecycle state.
6. As the payer, verify only **Accept** and **Decline** are available on a pending incoming request. As requester, verify only **Cancel request** is available.
7. Accept a request and verify it says accepted but not paid; complete its linked Payment Intent through the existing review/execution flow and verify only backend settlement changes it to paid.

## Transfer

1. Select **Transfer**.
2. Verify the intentional unavailable-beta state is displayed.
3. Verify no financial input, wallet input, or executable action is present.
