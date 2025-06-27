
import React, { useState } from 'react';
import { Search, Plus, Filter, Phone, Mail, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Leads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const leads = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@techcorp.com',
      company: 'Tech Corp',
      phone: '+1 (555) 123-4567',
      status: 'new',
      agent: 'Sarah Johnson',
      lastContact: '2024-01-15',
      nextFollowup: '2024-01-20',
      priority: 'high',
      value: '$50,000'
    },
    {
      id: 2,
      name: 'Emma Wilson',
      email: 'emma@designstudio.com',
      company: 'Design Studio',
      phone: '+1 (555) 234-5678',
      status: 'contacted',
      agent: 'Mike Davis',
      lastContact: '2024-01-18',
      nextFollowup: '2024-01-22',
      priority: 'medium',
      value: '$25,000'
    },
    {
      id: 3,
      name: 'Robert Brown',
      email: 'robert@marketing.com',
      company: 'Marketing Inc',
      phone: '+1 (555) 345-6789',
      status: 'qualified',
      agent: 'Sarah Johnson',
      lastContact: '2024-01-19',
      nextFollowup: '2024-01-25',
      priority: 'high',
      value: '$75,000'
    },
    {
      id: 4,
      name: 'Lisa Garcia',
      email: 'lisa@retailplus.com',
      company: 'Retail Plus',
      phone: '+1 (555) 456-7890',
      status: 'proposal',
      agent: 'Mike Davis',
      lastContact: '2024-01-17',
      nextFollowup: '2024-01-23',
      priority: 'high',
      value: '$100,000'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { variant: 'secondary' as const, label: 'New' },
      contacted: { variant: 'default' as const, label: 'Contacted' },
      qualified: { variant: 'default' as const, label: 'Qualified' },
      proposal: { variant: 'default' as const, label: 'Proposal' },
      closed: { variant: 'default' as const, label: 'Closed' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    return (
      <Badge variant={priority === 'high' ? 'destructive' : priority === 'medium' ? 'default' : 'secondary'}>
        {priority}
      </Badge>
    );
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">Manage and track your sales leads</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{lead.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{lead.company}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {getStatusBadge(lead.status)}
                  {getPriorityBadge(lead.priority)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {lead.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {lead.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  Agent: {lead.agent}
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Value:</span>
                  <span className="font-semibold text-green-600">{lead.value}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span className="text-gray-500">Next Follow-up:</span>
                  <span className="font-medium">{lead.nextFollowup}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Leads;
