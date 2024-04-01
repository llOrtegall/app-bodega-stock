import { Loading as Animation } from '../icons'

export const Loading = ({ children }: { children?: string }): JSX.Element => {
  return (
    <article className="w-full items-center justify-center flex flex-col">
      <Animation />
      <h2 className="font-semibold dark:text-white">{children}</h2>
    </article>
  )
}
