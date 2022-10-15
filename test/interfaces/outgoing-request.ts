import { Methods, Payload, RawApi } from 'grammy/out/core/client';
import { AbortSignal } from 'grammy/out/shim.node';

export interface OutgoingRequest<M extends Methods<RawApi> = Methods<RawApi>> {
  method: M;
  payload: Payload<M, RawApi>;
  signal?: AbortSignal;
}
