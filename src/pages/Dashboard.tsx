import React, { useState } from 'react';
import { Calendar, Users, Phone, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CallNotesModal from '@/components/CallNotesModal';
import { useToast } from '@/hooks/use-toast';

// Define Lead interface to match the one used in CallNotesModal
interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
  agent: string;
  lastContact: string;
  nextFollowup: string;
  priority: 'high' | 'medium' | 'low';
  value: string;
  notes?: string;
  callsMade?: number;
}

const Dashboard = () => {
  const {
    toast
  } = useToast();
  const [callNotesLead, setCallNotesLead] = useState<Lead | null>(null);

  // All leads with their follow-up dates
  const [allLeads, setAllLeads] = useState<Lead[]>([{
    id: 1,
    name: 'John Smith',
    company: 'Tech Corp',
    agent: 'Sarah Johnson',
    priority: 'high',
    email: 'john@techcorp.com',
    phone: '+1 (555) 123-4567',
    status: 'new' as const,
    lastContact: '2024-01-15',
    nextFollowup: new Date().toISOString().split('T')[0],
    value: '₹50,000',
    callsMade: 2
  }, {
    id: 2,
    name: 'Emma Wilson',
    company: 'Design Studio',
    agent: 'Mike Davis',
    priority: 'medium',
    email: 'emma@designstudio.com',
    phone: '+1 (555) 234-5678',
    status: 'contacted' as const,
    lastContact: '2024-01-18',
    nextFollowup: new Date().toISOString().split('T')[0],
    value: '₹25,000',
    callsMade: 1
  }, {
    id: 3,
    name: 'Robert Brown',
    company: 'Marketing Inc',
    agent: 'Sarah Johnson',
    priority: 'low',
    email: 'robert@marketing.com',
    phone: '+1 (555) 345-6789',
    status: 'qualified' as const,
    lastContact: '2024-01-19',
    nextFollowup: new Date().toISOString().split('T')[0],
    value: '₹75,000',
    callsMade: 3
  }, {
    id: 4,
    name: 'Lisa Garcia',
    company: 'Retail Plus',
    agent: 'Mike Davis',
    priority: 'high',
    email: 'lisa@retailplus.com',
    phone: '+1 (555) 456-7890',
    status: 'proposal' as const,
    lastContact: '2024-01-17',
    nextFollowup: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: '₹100,000',
    callsMade: 4
  }, {
    id: 5,
    name: 'David Lee',
    company: 'Finance Co',
    agent: 'Sarah Johnson',
    priority: 'medium',
    email: 'david@financeco.com',
    phone: '+1 (555) 567-8901',
    status: 'contacted' as const,
    lastContact: '2024-01-16',
    nextFollowup: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: '₹60,000',
    callsMade: 2
  }]);
  const today = new Date().toISOString().split('T')[0];

  // Filter leads for today's follow-ups (excluding overdue ones)
  const todayFollowups = allLeads.filter(lead => lead.nextFollowup === today);

  // Filter leads for overdue follow-ups
  const overdueFollowups = allLeads.filter(lead => {
    const followupDate = new Date(lead.nextFollowup);
    const todayDate = new Date(today);
    return followupDate < todayDate;
  }).map(lead => ({
    ...lead,
    daysOverdue: Math.floor((new Date(today).getTime() - new Date(lead.nextFollowup).getTime()) / (1000 * 60 * 60 * 24))
  }));

  // Calculate stats based on actual data
  const qualifiedLeadsCount = allLeads.filter(lead => lead.status === 'qualified').length;
  const totalCallsMade = allLeads.reduce((total, lead) => total + (lead.callsMade || 0), 0);

  const stats = [{
    title: 'Total Leads',
    value: allLeads.length.toString(),
    icon: Users,
    change: '+12%',
    color: 'text-blue-600'
  }, {
    title: 'Today\'s Follow-ups',
    value: todayFollowups.length.toString(),
    icon: Clock,
    change: '+3',
    color: 'text-orange-600'
  }, {
    title: 'Calls Made',
    value: totalCallsMade.toString(),
    icon: Phone,
    change: '+8',
    color: 'text-green-600'
  }, {
    title: 'Qualified Leads',
    value: qualifiedLeadsCount.toString(),
    icon: CheckCircle,
    change: '+5',
    color: 'text-purple-600'
  }];
  const handleCall = (followup: any) => {
    // Convert followup to Lead format for the modal
    const lead: Lead = {
      id: followup.id,
      name: followup.name,
      email: followup.email,
      company: followup.company,
      phone: followup.phone,
      status: followup.status,
      agent: followup.agent,
      lastContact: followup.lastContact,
      nextFollowup: followup.nextFollowup,
      priority: followup.priority,
      value: followup.value,
      notes: followup.notes,
      callsMade: followup.callsMade
    };
    setCallNotesLead(lead);
  };
  const handleCallNotesSave = (leadId: number, notes: string, nextFollowupDate?: string, status?: string) => {
    console.log('Call notes saved for lead:', leadId, notes, 'Next followup:', nextFollowupDate, 'Status:', status);

    // Update the lead with new follow-up date, status if provided, and increment calls made
    setAllLeads(prevLeads => prevLeads.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          nextFollowup: nextFollowupDate || lead.nextFollowup,
          status: (status as 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed') || lead.status,
          lastContact: today,
          notes: notes,
          callsMade: (lead.callsMade || 0) + 1
        };
      }
      return lead;
    }));

    toast({
      title: "Call Notes Saved",
      description: "Call notes have been saved successfully."
    });
  };
  return <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your sales overview.</p>
        </div>
        <div className="flex gap-3">
          
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1 font-medium">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Follow-ups */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Today's Follow-ups ({todayFollowups.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayFollowups.length === 0 ? <p className="text-gray-500 text-center py-4">No follow-ups scheduled for today</p> : todayFollowups.map(followup => <div key={followup.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{followup.name}</h3>
                      <p className="text-sm text-gray-600">{followup.company}</p>
                      <p className="text-sm text-gray-500">Agent: {followup.agent}</p>
                      <p className="text-sm text-gray-500">Value: {followup.value}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-medium text-gray-900">Today</p>
                        <Badge variant={followup.priority === 'high' ? 'destructive' : followup.priority === 'medium' ? 'default' : 'secondary'}>
                          {followup.priority}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleCall(followup)} className="ml-2">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>)}
            </div>
          </CardContent>
        </Card>

        {/* Overdue Follow-ups */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              Overdue Follow-ups ({overdueFollowups.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overdueFollowups.length === 0 ? <p className="text-gray-500 text-center py-4">No overdue follow-ups</p> : overdueFollowups.map(followup => <div key={followup.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{followup.name}</h3>
                      <p className="text-sm text-gray-600">{followup.company}</p>
                      <p className="text-sm text-gray-500">Agent: {followup.agent}</p>
                      <p className="text-sm text-gray-500">Value: {followup.value}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-medium text-red-600">{followup.daysOverdue} days overdue</p>
                        <Badge variant={followup.priority === 'high' ? 'destructive' : 'default'}>
                          {followup.priority}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleCall(followup)} className="ml-2 border-red-200 hover:bg-red-50">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call Notes Modal */}
      {callNotesLead && <CallNotesModal lead={callNotesLead} isOpen={!!callNotesLead} onClose={() => setCallNotesLead(null)} onSave={handleCallNotesSave} />}
    </div>;
};
export default Dashboard;
