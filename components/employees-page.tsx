'use client'

import { useMemo, useState } from 'react'
import { Building2, ChevronDown, ChevronLeft, ChevronRight, Edit3, FileText, MoreHorizontal, Plus, Search, Trash2, Users, X } from 'lucide-react'

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
  { id: 'EMP-001', name: 'María Fernanda López', initials: 'ML', dpi: '2845 90123 0101', phone: '+502 5555 0182', status: 'Activo', position: 'Gerente de operaciones', frequency: 'Mensual', salary: 'Q 18,500.00', bank: 'Banco Industrial', account: '•••• 4821', address: 'Zona 10, Guatemala' },
  { id: 'EMP-002', name: 'Carlos Ramírez Castillo', initials: 'CR', dpi: '1967 34501 0101', phone: '+502 4421 7830', status: 'Activo', position: 'Analista financiero', frequency: 'Mensual', salary: 'Q 11,250.00', bank: 'Banrural', account: '•••• 0934', address: 'Zona 12, Guatemala' },
  { id: 'EMP-003', name: 'Sofía Alejandra Méndez', initials: 'SM', dpi: '3012 77894 0101', phone: '+502 5120 4467', status: 'Activo', position: 'Diseñadora UX/UI', frequency: 'Quincenal', salary: 'Q 9,800.00', bank: 'BAC Credomatic', account: '•••• 7612', address: 'Mixco, Guatemala' },
  { id: 'EMP-004', name: 'Jorge Luis Herrera', initials: 'JH', dpi: '2256 11289 0101', phone: '+502 4022 6198', status: 'Inactivo', position: 'Coordinador de ventas', frequency: 'Quincenal', salary: 'Q 8,400.00', bank: 'Banco G&T', account: '•••• 2245', address: 'Villa Nueva, Guatemala' },
  { id: 'EMP-005', name: 'Ana Lucía Morales', initials: 'AM', dpi: '2789 66742 0101', phone: '+502 5316 9034', status: 'Activo', position: 'Asistente administrativa', frequency: 'Mensual', salary: 'Q 6,750.00', bank: 'Banco Industrial', account: '•••• 8103', address: 'Zona 7, Guatemala' },
]

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [query, setQuery] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState<Employee | null>(null)
  const [menuId, setMenuId] = useState<string | null>(null)

  const filteredEmployees = useMemo(() => employees.filter((employee) => `${employee.name} ${employee.id} ${employee.dpi} ${employee.position}`.toLowerCase().includes(query.toLowerCase())), [employees, query])
  const openNew = () => { setEditing(null); setIsFormOpen(true) }
  const openEdit = (employee: Employee) => { setEditing(employee); setIsFormOpen(true); setMenuId(null) }
  const remove = (id: string) => { setEmployees((current) => current.filter((employee) => employee.id !== id)); setMenuId(null) }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-[248px] border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col">
        <div className="flex items-center gap-3 px-2">
            <div className="grid size-9 place-items-center rounded-xl bg-[#173b67] text-white"><Building2 /></div>
            <div>
                <p className="text-[15px] font-bold tracking-tight">Nómina Clara</p>
                <p className="text-[11px] text-slate-400">Gestión administrativa</p>
            </div>
            </div>
        <nav className="mt-10 flex flex-col gap-2" aria-label="Navegación principal">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Menú principal</p>
                <a className="mt-2 flex items-center gap-3 rounded-lg bg-[#eaf1f8] px-3 py-2.5 text-sm font-semibold text-[#173b67]" href="#empleados">
                    <Users /> Empleados</a>
                    <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-50" href="#nomina"><FileText /> Nómina</a></nav>
        <div className="mt-auto rounded-xl bg-[#173b67] p-4 text-white"><p className="text-xs font-semibold">¿Necesitas ayuda?</p>
        <p className="mt-1 text-[11px] leading-4 text-blue-100">Consulta el centro de soporte para resolver tus dudas.</p>
        <button className="mt-3 text-xs font-bold underline underline-offset-2">Ir al centro de ayuda</button>
        </div>
      </aside>

      <main className="lg:pl-[248px]">
        <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-10">
            <div className="lg:hidden">
                <span className="font-bold">Nómina Clara</span>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <div className="grid size-9 place-items-center rounded-full bg-[#fce8d8] text-xs font-bold text-[#a95e33]">JG</div>
                    <div className="hidden sm:block">
                        <p className="text-xs font-semibold">Juan García</p>
                        <p className="text-[11px] text-slate-400">Administrador</p></div>
                        <ChevronDown className="text-slate-400" />
                    </div></header>
        <div className="mx-auto max-w-[1440px] px-5 py-8 lg:px-10">
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <p className="mb-2 text-xs font-semibold text-[#2e78b7]">GESTIÓN DE PERSONAL</p>
                    <h1 className="text-3xl font-bold tracking-tight text-[#162b44]">Empleados</h1>
                    <p className="mt-2 text-sm text-slate-500">Administra la información y datos de tu equipo.</p>
                    </div>
                    <button onClick={openNew} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#f07c3e] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#d9652e]"><Plus /> Nuevo empleado</button>
                    </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">Total empleados</span>
                    <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-[#2e78b7]"><Users /></span>
                    </div>
                    <p className="mt-4 text-2xl font-bold text-[#162b44]">{employees.length}</p>
                    <p className="mt-1 text-xs text-slate-400">Registrados en el sistema</p></div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-500">Empleados activos</span>
                            <span className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600"><Users /></span>
                            </div>
                            <p className="mt-4 text-2xl font-bold text-[#162b44]">{employees.filter((employee) => employee.status === 'Activo').length}</p>
                            <p className="mt-1 text-xs text-emerald-600">+12% este mes</p></div>
                            <div className="rounded-xl border border-slate-200 bg-white p-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-500">Nómina mensual</span>
                                    <span className="grid size-8 place-items-center rounded-lg bg-orange-50 text-[#f07c3e]">Q</span></div>
                                    <p className="mt-4 text-2xl font-bold text-[#162b44]">Q 54,700.00</p>
                                    <p className="mt-1 text-xs text-slate-400">Salarios base acumulados</p></div>
                                    </div>
          <section id="empleados" className="mt-7 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="font-bold text-[#162b44]">Directorio de empleados</h2>
                    <p className="mt-1 text-xs text-slate-400">Consulta, modifica o elimina registros.</p>
                    </div>
                    <div className="relative w-full md:max-w-[290px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input aria-label="Buscar empleado" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, DPI o ID..." className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-[#2e78b7] focus:ring-2 focus:ring-blue-100" />
                        </div></div>
                        <div className="overflow-x-auto"><table className="w-full min-w-[980px] text-left text-xs">
                            <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
                            <tr><th className="px-5 py-3 font-bold">Empleado</th>
                            <th className="px-5 py-3 font-bold">DPI</th>
                            <th className="px-5 py-3 font-bold">Teléfono</th>
                            <th className="px-5 py-3 font-bold">Puesto</th>
                            <th className="px-5 py-3 font-bold">Frecuencia</th>
                            <th className="px-5 py-3 font-bold">Salario base</th>
                            <th className="px-5 py-3 font-bold">Estado</th>
                            <th className="px-5 py-3 font-bold">Acciones</th></tr></thead>
                            <tbody className="divide-y divide-slate-100">{filteredEmployees.map((employee) => <tr key={employee.id} className="hover:bg-slate-50/70">
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eaf1f8] text-[11px] font-bold text-[#2e78b7]">{employee.initials}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-700">{employee.name}</p>
                                            <p className="mt-0.5 text-[10px] text-slate-400">{employee.id}</p>
                                            </div></div></td>
                                            <td className="px-5 py-4 text-slate-500">{employee.dpi}</td>
                                            <td className="px-5 py-4 text-slate-500">{employee.phone}</td>
                                            <td className="px-5 py-4 font-medium text-slate-600">{employee.position}</td>
                                            <td className="px-5 py-4 text-slate-500">{employee.frequency}</td>
                                            <td className="px-5 py-4 font-semibold text-slate-700">{employee.salary}</td>
                                            <td className="px-5 py-4">
                                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${employee.status === 'Activo' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{employee.status}</span></td>
                                                <td className="relative px-5 py-4">
                                                    <button aria-label={`Acciones para ${employee.name}`} onClick={() => setMenuId(menuId === employee.id ? null : employee.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><MoreHorizontal />
                                                    </button>{menuId === employee.id && <div className="absolute right-5 top-12 z-10 w-36 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
                                                        <button onClick={() => openEdit(employee)} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-slate-600 hover:bg-slate-50"><Edit3 /> Editar</button>
                                                        <button onClick={() => remove(employee.id)} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-red-600 hover:bg-red-50"><Trash2 /> Eliminar</button></div>}</td></tr>)}</tbody></table></div>{filteredEmployees.length === 0 && <div className="px-5 py-12 text-center text-sm text-slate-500">No encontramos empleados con esa búsqueda.</div>}<div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
                                                            <span>Mostrando {filteredEmployees.length} de {employees.length} empleados</span>
                                                            <div className="flex items-center gap-1">
                                                                <button aria-label="Página anterior" className="grid size-7 place-items-center rounded border border-slate-200 text-slate-400"><ChevronLeft /></button>
                                                                <button className="grid size-7 place-items-center rounded bg-[#173b67] text-white">1</button>
                                                                <button aria-label="Página siguiente" className="grid size-7 place-items-center rounded border border-slate-200 text-slate-400"><ChevronRight /></button></div></div></section>
        </div>
      </main>
      {isFormOpen && <div className="fixed inset-0 z-20 grid place-items-center bg-slate-950/30 p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="employee-form-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
                <h2 id="employee-form-title" className="font-bold text-[#162b44]">{editing ? 'Editar empleado' : 'Nuevo empleado'}</h2><p className="mt-1 text-xs text-slate-400">Completa la información del registro.</p></div>
                <button aria-label="Cerrar formulario" onClick={() => setIsFormOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X /></button></div>
                <form onSubmit={(event) => { event.preventDefault(); setIsFormOpen(false) }} className="grid gap-4 p-6 sm:grid-cols-2">
                    <label className="text-xs font-semibold text-slate-600">Nombre completo
                        <input defaultValue={editing?.name} required className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#2e78b7]" /></label>
                        <label className="text-xs font-semibold text-slate-600">DPI
                            <input defaultValue={editing?.dpi} required className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#2e78b7]" /></label>
                            <label className="text-xs font-semibold text-slate-600">Teléfono<input defaultValue={editing?.phone} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#2e78b7]" /></label>
                            <label className="text-xs font-semibold text-slate-600">Puesto<input defaultValue={editing?.position} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#2e78b7]" /></label>
                            <label className="text-xs font-semibold text-slate-600">ID puesto<input defaultValue={editing ? 'PUE-004' : ''} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#2e78b7]" /></label>
                            <label className="text-xs font-semibold text-slate-600">Frecuencia de pago<select defaultValue={editing?.frequency ?? 'Mensual'} className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-[#2e78b7]">
                                <option>Mensual</option>
                                <option>Quincenal</option>
                                <option>Semanal</option>
                                </select></label>
                                <label className="text-xs font-semibold text-slate-600">Salario base<input defaultValue={editing?.salary.replace('Q ', '').replace(',', '')} placeholder="0.00" className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#2e78b7]" /></label>
                                <label className="text-xs font-semibold text-slate-600">Banco destino<input defaultValue={editing?.bank} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#2e78b7]" /></label>
                                <label className="text-xs font-semibold text-slate-600 sm:col-span-2">Número de cuenta<input defaultValue={editing?.account.replace('•••• ', '')} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-[#2e78b7]" /></label>
                                <label className="text-xs font-semibold text-slate-600 sm:col-span-2">Dirección<textarea defaultValue={editing?.address} rows={2} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal outline-none focus:border-[#2e78b7]" /></label>
                                <label className="text-xs font-semibold text-slate-600 sm:col-span-2">Fotografía de DPI<input type="file" accept="image/*" className="mt-2 block w-full rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-normal text-slate-500" /></label>
                                <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 sm:col-span-2">
                                    <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600">Cancelar</button>
                                    <button type="submit" className="rounded-lg bg-[#173b67] px-5 py-2.5 text-xs font-bold text-white">Guardar empleado</button></div></form></div></div>}
    </div>
  )
}

export { initialEmployees }
export type { Employee }
