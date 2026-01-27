type Props = {
  title: string
  children: React.ReactNode
}

export default function CVSection({ title, children }: Props) {
  return (
    <section className="border rounded-xl p-4 mb-4 bg-white">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </section>
  )
}