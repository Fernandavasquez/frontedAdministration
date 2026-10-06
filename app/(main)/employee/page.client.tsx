'use client'

import { useMemo, useState } from 'react'
import {
  Banknote,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit3,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  UserRound,
  Users,
  X,
} from 'lucide-react'

type Employee = {
  id: string
  name: string
  initials: string
  dpi: string
  phone: string
  status: 'Activo' | 'Inactivo'
  position: string
  frequency: string
  salary: string
  bank: string
  account: string
  address: string
}

const initialEmployees: Employee[] = [
  { id: 'EMP-001', name: 'Ana María López', initials: 'AL', dpi: '2456 78901 0101', phone: '5555-0182', status: 'Activo', position: 'Gerente general', frequency: 'Mensual', salary: 'Q 18,500.00', bank: 'Banrural', account: '**** 4821', address: 'Zona 10, Ciudad de Guatemala' },
  { id: 'EMP-002', name: 'Carlos Méndez', initials: 'CM', dpi: '2789 12345 0101', phone: '5555-2241', status: 'Activo', position: 'Contador', frequency: 'Mensual', salary: 'Q 9,800.00', bank: 'BAC', account: '**** 7634', address: 'Mixco, Guatemala' },
  { id: 'EMP-003', name: 'Sofía Ramírez', initials: 'SR', dpi: '3012 45678 0101', phone: '5555-9077', status: 'Activo', position: 'Diseñadora', frequency: 'Quincenal', salary: 'Q 7,250.00', bank: 'G&T Continental', account: '**** 1920', address: 'Zona 4, Ciudad de Guatemala' },
  { id: 'EMP-004', name: 'Diego Castillo', initials: 'DC', dpi: '2234 56789 0101', phone: '5555-3318', status: 'Inactivo', position: 'Asistente administrativo', frequency: 'Mensual', salary: 'Q 5,500.00', bank: 'Banrural', account: '**** 0456', address: 'Villa Nueva, Guatemala' },
  { id: 'EMP-005', name: 'Lucía Herrera', initials: 'LH', dpi: '2890 12345 0101', phone: '5555-6624', status: 'Activo', position: 'Recursos humanos', frequency: 'Mensual', salary: 'Q 8,100.00', bank: 'BAM', account: '**** 8912', address: 'Zona 15, Ciudad de Guatemala' },
]

const avatarColors = ['bg-[#d9e8df] text-[#35664d]', 'bg-[#e6def4] text-[#644a8d]', 'bg-[#f4e1ce] text-[#9a5e24]', 'bg-[#dbe8f3] text-[#3a6384]', 'bg-[#f1dce3] text-[#914a65]']

export default function Page() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Employee | null>(null)
  const [menuId, setMenuId] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const filteredEmployees = useMemo(() => employees.filter((employee) => {
    const matchesQuery = `${employee.name} ${employee.id} ${employee.dpi} ${employee.position}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (statusFilter === 'Todos' || employee.status === statusFilter)
  }), [employees, query, statusFilter])

  const openCreate = () => { setEditing(null); setShowForm(true) }
  const openEdit = (employee: Employee) => { setEditing(employee); setMenuId(null); setShowForm(true) }
  const removeEmployee = (id: string) => { setEmployees((current) => current.filter((employee) => employee.id !== id)); setMenuId(null) }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#182126]">
      <div className="mx-auto max-w-[1440px] px-5 py-7 lg:px-10">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
                <p className="mb-2 text-xs font-medium text-[#879299]">Administración / Empleados</p>
                <h1 className="text-[26px] font-semibold tracking-[-0.03em]">Empleados</h1>
                <p className="mt-1 text-sm text-[#7d898f]">Gestiona la información y datos de tu equipo.</p>
            </div>
                <button onClick={openCreate} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1e5c48] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[#164837]">
                    <Plus /> Nuevo empleado
                </button>
        </div>

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard icon={<Users />} label="Total empleados" value={employees.length.toString()} detail="Registrados en el sistema" />
            <SummaryCard icon={<UserRound />} label="Empleados activos" value={employees.filter((employee) => employee.status === 'Activo').length.toString()} detail="Con contrato vigente" accent="green" />
            <SummaryCard icon={<Banknote />} label="Nómina mensual" value="Q 49,150" detail="Salario base total" /></section>

        <section className="overflow-hidden rounded-xl border border-[#e4e8eb] bg-white shadow-[0_1px_2px_rgba(20,40,35,0.03)]">
            <div className="flex flex-col gap-3 border-b border-[#edf0f1] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-sm flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa5aa]" />
                    <input aria-label="Buscar empleado" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Buscar por nombre, DPI o ID..." className="h-9 w-full rounded-md border border-[#e2e7e9] bg-[#fbfcfc] pl-9 pr-9 text-xs outline-none transition placeholder:text-[#a5afb4] focus:border-[#6f9c8c] focus:ring-2 focus:ring-[#dcece5]" />
                    {query &&
                     <button aria-label="Limpiar búsqueda" onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8a969c]">
                        <X />
                        </button>}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 items-center gap-1 rounded-md border border-[#e2e7e9] p-1 text-xs">
                                <button onClick={() => setStatusFilter('Todos')} className={`rounded px-2.5 py-1.5 ${statusFilter === 'Todos' ? 'bg-[#edf4f0] font-medium text-[#236047]' : 'text-[#89949a]'}`}>Todos</button>
                                <button onClick={() => setStatusFilter('Activo')} className={`rounded px-2.5 py-1.5 ${statusFilter === 'Activo' ? 'bg-[#edf4f0] font-medium text-[#236047]' : 'text-[#89949a]'}`}>Activos</button>
                                <button onClick={() => setStatusFilter('Inactivo')} className={`rounded px-2.5 py-1.5 ${statusFilter === 'Inactivo' ? 'bg-[#edf4f0] font-medium text-[#236047]' : 'text-[#89949a]'}`}>Inactivos</button>
                            </div>
                            <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#e2e7e9] px-3 text-xs font-medium text-[#657278] hover:bg-[#f7f9f8]"><Filter /> Filtrar</button>
                            <button className="hidden h-9 items-center gap-1.5 rounded-md border border-[#e2e7e9] px-3 text-xs font-medium text-[#657278] hover:bg-[#f7f9f8] sm:inline-flex"><Download /> Exportar</button>
                        </div>
                    </div>
          <div className="overflow-x-auto"><table className="w-full min-w-[920px] text-left text-xs"><thead className="bg-[#fafbfb] text-[10px] uppercase tracking-[0.08em] text-[#89949a]"><tr><th className="px-5 py-3 font-medium">Empleado</th><th className="px-3 py-3 font-medium">DPI</th><th className="px-3 py-3 font-medium">Teléfono</th><th className="px-3 py-3 font-medium">Puesto</th><th className="px-3 py-3 font-medium">Frecuencia</th><th className="px-3 py-3 font-medium">Salario base</th><th className="px-3 py-3 font-medium">Estado</th><th className="px-5 py-3 text-right font-medium">Acciones</th></tr></thead><tbody className="divide-y divide-[#edf0f1]">{filteredEmployees.map((employee, index) => <tr key={employee.id} className="group transition hover:bg-[#fbfdfc]"><td className="px-5 py-3.5"><div className="flex items-center gap-3"><div className={`grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-semibold ${avatarColors[index % avatarColors.length]}`}>{employee.initials}</div><div><p className="font-medium text-[#253137]">{employee.name}</p><p className="mt-0.5 text-[10px] text-[#9aa4a9]">{employee.id}</p></div></div></td><td className="px-3 text-[#68757b]">{employee.dpi}</td><td className="px-3 text-[#68757b]">{employee.phone}</td><td className="px-3"><div className="flex items-center gap-1.5 text-[#536168]"><BriefcaseBusiness className="text-[#94a29e]" />{employee.position}</div></td><td className="px-3 text-[#68757b]">{employee.frequency}</td><td className="px-3 font-medium text-[#435259]">{employee.salary}</td><td className="px-3"><span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-medium ${employee.status === 'Activo' ? 'bg-[#e8f4ed] text-[#347451]' : 'bg-[#f1f2f3] text-[#7a858a]'}`}><span className={`size-1.5 rounded-full ${employee.status === 'Activo' ? 'bg-[#4a9a6d]' : 'bg-[#9ca5a9]'}`} />{employee.status}</span></td><td className="relative px-5 text-right"><button aria-label={`Acciones para ${employee.name}`} onClick={() => setMenuId(menuId === employee.id ? null : employee.id)} className="rounded-md p-1.5 text-[#879399] hover:bg-[#eef3f0] hover:text-[#28634e]"><MoreHorizontal /></button>{menuId === employee.id && <div className="absolute right-5 top-10 z-10 w-32 rounded-lg border border-[#e2e7e9] bg-white p-1 text-left shadow-lg"><button onClick={() => { setMenuId(null) }} className="flex w-full items-center gap-2 rounded px-2 py-2 text-xs text-[#5d6a70] hover:bg-[#f3f7f5]"><Eye /> Ver detalle</button><button onClick={() => openEdit(employee)} className="flex w-full items-center gap-2 rounded px-2 py-2 text-xs text-[#5d6a70] hover:bg-[#f3f7f5]"><Edit3 /> Editar</button><button onClick={() => removeEmployee(employee.id)} className="flex w-full items-center gap-2 rounded px-2 py-2 text-xs text-[#bb5c54] hover:bg-[#fff2f0]"><Trash2 /> Eliminar</button></div>}</td></tr>)}</tbody></table>{filteredEmployees.length === 0 && <div className="p-12 text-center text-sm text-[#879399]">No se encontraron empleados con esos criterios.</div>}</div>
          <div className="flex items-center justify-between border-t border-[#edf0f1] px-5 py-3 text-xs text-[#8a969c]"><span>Mostrando <strong className="font-medium text-[#59666c]">{filteredEmployees.length}</strong> de <strong className="font-medium text-[#59666c]">{employees.length}</strong> empleados</span><div className="flex items-center gap-1"><button aria-label="Página anterior" onClick={() => setPage(Math.max(1, page - 1))} className="grid size-7 place-items-center rounded border border-[#e3e7e8] hover:bg-[#f5f8f6]"><ChevronLeft /></button><span className="grid size-7 place-items-center rounded bg-[#e9f2ee] font-medium text-[#28634e]">{page}</span><button aria-label="Página siguiente" onClick={() => setPage(page + 1)} className="grid size-7 place-items-center rounded border border-[#e3e7e8] hover:bg-[#f5f8f6]"><ChevronRight /></button></div></div>
        </section>
      </div>
      {showForm && <EmployeeForm employee={editing} onClose={() => setShowForm(false)} onSave={(employee) => { setEmployees((current) => editing ? current.map((item) => item.id === employee.id ? employee : item) : [employee, ...current]); setShowForm(false) }} />}
    </main>
  )
}

function SummaryCard({ icon, label, value, detail, accent = 'default' }: { icon: React.ReactNode; label: string; value: string; detail: string; accent?: string }) { return <div className="rounded-xl border border-[#e4e8eb] bg-white p-4"><div className="flex items-start justify-between"><div><p className="text-xs text-[#89949a]">{label}</p><p className="mt-2 text-[22px] font-semibold tracking-tight text-[#263238]">{value}</p><p className="mt-1 text-[10px] text-[#a0aaae]">{detail}</p></div><div className={`grid size-8 place-items-center rounded-lg ${accent === 'green' ? 'bg-[#e8f3ed] text-[#347451]' : 'bg-[#f0f4f2] text-[#668277]'}`}>{icon}</div></div></div> }

function EmployeeForm({ employee, onClose, onSave }: { employee: Employee | null; onClose: () => void; onSave: (employee: Employee) => void }) {
  const [name, setName] = useState(employee?.name ?? '')
  const [dpi, setDpi] = useState(employee?.dpi ?? '')
  const [phone, setPhone] = useState(employee?.phone ?? '')
  const [position, setPosition] = useState(employee?.position ?? '')
  const save = () => { if (!name.trim() || !dpi.trim()) return; 
    onSave({
        id: employee?.id ?? `EMP-${String(Date.now()).slice(-3)}`, name, initials: name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase(),
        dpi, phone, position: position || 'Sin asignar', frequency: employee?.frequency ?? 'Mensual', salary: employee?.salary ?? 'Q 0.00',
        bank: employee?.bank ?? 'Pendiente', account: employee?.account ??
            'Pendiente', address: employee?.address ?? 'Pendiente',
        status: 'Activo'
    }) }
  return <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#14231f]/35 p-4"><div role="dialog" aria-modal="true" aria-labelledby="employee-form-title" className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-start justify-between"><div><h2 id="employee-form-title" className="text-lg font-semibold">{employee ? 'Editar empleado' : 'Nuevo empleado'}</h2><p className="mt-1 text-xs text-[#89949a]">Completa los datos principales del colaborador.</p></div><button aria-label="Cerrar formulario" onClick={onClose} className="rounded-md p-1 text-[#8d999e] hover:bg-[#f1f4f3]"><X /></button></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-medium text-[#56636a] sm:col-span-2">Nombre completo<input value={name} onChange={(event) => setName(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-[#dfe5e6] px-3 text-sm font-normal outline-none focus:border-[#6f9c8c]" placeholder="Ej. María López" /></label><label className="text-xs font-medium text-[#56636a]">DPI<input value={dpi} onChange={(event) => setDpi(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-[#dfe5e6] px-3 text-sm font-normal outline-none focus:border-[#6f9c8c]" placeholder="0000 00000 0000" /></label><label className="text-xs font-medium text-[#56636a]">Teléfono<input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-[#dfe5e6] px-3 text-sm font-normal outline-none focus:border-[#6f9c8c]" placeholder="5555-0000" /></label><label className="text-xs font-medium text-[#56636a] sm:col-span-2">Puesto<input value={position} onChange={(event) => setPosition(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-[#dfe5e6] px-3 text-sm font-normal outline-none focus:border-[#6f9c8c]" placeholder="Ej. Analista financiero" /></label></div><div className="mt-6 flex justify-end gap-2 border-t border-[#edf0f1] pt-4"><button onClick={onClose} className="h-9 rounded-md border border-[#dfe5e6] px-4 text-xs font-medium text-[#68757b] hover:bg-[#f7f9f8]">Cancelar</button><button onClick={save} className="h-9 rounded-md bg-[#1e5c48] px-4 text-xs font-medium text-white hover:bg-[#164837]">Guardar empleado</button></div></div></div>
}
