export type MascotState =
  | 'idle'
  | 'walk'
  | 'run'
  | 'jump'
  | 'happy'
  | 'sleepy'
  | 'surprised'
  | 'confused'
  | 'relaxed'

export interface Position {
  x: number
  y: number
}
