export default function Layout({ children, headerAction }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Project Management
          </h1>
          {headerAction}
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
