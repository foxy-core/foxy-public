export enum PokeResponseStatus {
  Resolved = 'resolved',
  Rejected = 'rejected',
}

export type PokeResponse<OutputDTO> =
  | {
      status: PokeResponseStatus.Resolved
      result: OutputDTO
    }
  | {
      status: PokeResponseStatus.Rejected
      reason: string
    }
