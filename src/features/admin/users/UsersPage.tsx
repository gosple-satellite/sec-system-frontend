// ============================================================
// User Management - Admin Module
// ============================================================

import { useState } from 'react';
import { Card, Table, Button, Badge, Input, Select, Modal } from '@components/ui';
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2, Shield } from 'lucide-react';

const mockUsers = [
  {
    id: '1',
    firstName: 'Samuel',
    lastName: 'Adeyemi',
    email: 'admin@rccg.com',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    estate: 'Redemption City Core',
    addedOn: '2026-01-15',
  },
  {
    id: '2',
    firstName: 'Grace',
    lastName: 'Okonkwo',
    email: 'resident1@rccg.com',
    role: 'RESIDENT',
    status: 'ACTIVE',
    estate: 'Zone A',
    addedOn: '2026-03-22',
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Oluwaseun',
    email: 'david.o@example.com',
    role: 'RESIDENT',
    status: 'SUSPENDED',
    estate: 'Zone B',
    addedOn: '2026-04-10',
  },
  {
    id: '4',
    firstName: 'Emeka',
    lastName: 'Nwosu',
    email: 'visitor@rccg.com',
    role: 'VISITOR',
    status: 'ACTIVE',
    estate: 'Zone A',
    addedOn: '2026-05-05',
  },
  {
    id: '5',
    firstName: 'Sarah',
    lastName: 'Lee',
    email: 'sarah.lee@example.com',
    role: 'RESIDENT',
    status: 'PENDING',
    estate: 'Zone C',
    addedOn: '2026-06-12',
  },
  {
    id: '6',
    firstName: 'Michael',
    lastName: 'Obi',
    email: 'm.obi@example.com',
    role: 'SECURITY',
    status: 'ACTIVE',
    estate: 'Main Gate',
    addedOn: '2026-02-28',
  },
];

export function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter logic
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = (user.firstName + ' ' + user.lastName + user.email)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage residents, visitors, and administrative accounts
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Add New User
        </Button>
      </div>

      {/* ── Filters Row ────────────────────────────────────────── */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftElement={<Search className="w-4 h-4" />}
              fullWidth
            />
          </div>
          <div className="w-full sm:w-48 flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <Select
              options={[
                { label: 'All Roles', value: '' },
                { label: 'Super Admin', value: 'SUPER_ADMIN' },
                { label: 'Resident', value: 'RESIDENT' },
                { label: 'Visitor', value: 'VISITOR' },
                { label: 'Security', value: 'SECURITY' },
              ]}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              fullWidth
            />
          </div>
        </div>
      </Card>

      {/* ── Data Table ─────────────────────────────────────────── */}
      <Card className="overflow-hidden border border-slate-200 dark:border-slate-700">
        <Table
          data={filteredUsers}
          columns={[
            {
              key: 'user',
              header: 'User',
              render: (_, user: any) => (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold shrink-0 border border-blue-200 dark:border-blue-800">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                  </div>
                </div>
              ),
            },
            {
              key: 'role',
              header: 'Role',
              render: (role: any) => (
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  {role === 'SUPER_ADMIN' && <Shield className="w-3.5 h-3.5 text-blue-500" />}
                  <span className="text-sm">{String(role).replace('_', ' ')}</span>
                </div>
              ),
            },
            {
              key: 'estate',
              header: 'Zone / Estate',
            },
            {
              key: 'status',
              header: 'Status',
              render: (status: any) => (
                <Badge
                  variant={
                    status === 'ACTIVE' ? 'success' : status === 'SUSPENDED' ? 'error' : 'warning'
                  }
                >
                  {String(status)}
                </Badge>
              ),
            },
            {
              key: 'actions',
              header: '',
              render: () => (
                <div className="flex items-center justify-end gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              ),
            },
          ]}
        />
        {/* Pagination mock */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">
          <span>
            Showing 1 to {filteredUsers.length} of {filteredUsers.length} entries
          </span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="primary" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* ── Add User Modal (Mock) ──────────────────────────────── */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New User">
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="e.g. John" />
            <Input label="Last Name" placeholder="e.g. Doe" />
          </div>
          <Input label="Email Address" type="email" placeholder="john.doe@example.com" />
          <Select
            label="Assign Role"
            options={[
              { label: 'Resident', value: 'RESIDENT' },
              { label: 'Security Personnel', value: 'SECURITY' },
              { label: 'Super Admin', value: 'SUPER_ADMIN' },
            ]}
          />
          <Input label="Estate / Zone" placeholder="e.g. Zone A" />
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsAddModalOpen(false)}>
              Create User
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
