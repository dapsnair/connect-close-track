
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
}

const Dashboard = () => {
  const { toast } = useToast();
  const [callNotesLead, setCallNotesLead] = useState<Lead | null>(null);

  const todayFollowups = [
    { id: 1, name: 'John Smith', company: 'Tech Corp', time: '10:00 AM', agent: 'Sarah Johnson', priority: 'high', email: 'john@techcorp.com', phone: '+1 (555) 123-4567', status: 'new' as const, lastContact: '2024-01-15', nextFollowup: '2024-01-20', value: '₹50,000' },
    { id: 2, name: 'Emma Wilson', company: 'Design Studio', time: '2:30 PM', agent: 'Mike Davis', priority: 'medium', email: 'emma@designstudio.com', phone: '+1 (555) 234-5678', status: 'contacted' as const, lastContact: '2024-01-18', nextFollowup: '2024-01-22', value: '₹25,000' },
    { id: 3, name: 'Robert Brown', company: 'Marketing Inc', time: '4:00 PM', agent: 'Sarah Johnson', priority: 'low', email: 'robert@marketing.com', phone: '+1 (555) 345-6789', status: 'qualified' as const, lastContact: '2024-01-19', nextFollowup: '2024-01-25', value: '₹75,000' },
  ];

  const overdueFollowups = [
    { id: 4, name: 'Lisa Garcia', company: 'Retail Plus', daysOverdue: 2, agent: 'Mike Davis', priority: 'high', email: 'lisa@retailplus.com', phone: '+1 (555) 456-7890', status: 'proposal' as const, lastContact: '2024-01-17', nextFollowup: '2024-01-23', value: '₹100,000' },
    { id: 5, name: 'David Lee', company: 'Finance Co', daysOverdue: 1, agent: 'Sarah Johnson', priority: 'medium', email: 'david@financeco.com', phone: '+1 (555) 567-8901', status: 'contacted' as const, lastContact: '2024-01-16', nextFollowup: '2024-01-24', value: '₹60,000' },
  ];

  const stats = [
    { title: 'Total Leads', value: '247', icon: Users, change: '+12%', color: 'text-blue-600' },
    { title: 'Today\'s Follow-ups', value: '8', icon: Clock, change: '+3', color: 'text-orange-600' },
    { title: 'Calls Made', value: '23', icon: Phone, change: '+8', color: 'text-green-600' },
    { title: 'Qualified Leads', value: '12', icon: CheckCircle, change: '+5', color: 'text-purple-600' },
  ];

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
      notes: followup.notes
    };
    setCallNotesLead(lead);
  };

  const handleCallNotesSave = (leadId: number, notes: string) => {
    // In a real app, this would update the backend
    console.log('Call notes saved for lead:', leadId, notes);
    toast({
      title: "Call Notes Saved",
      description: "Call notes have been saved successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your sales overview.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Phone className="w-4 h-4 mr-2" />
            Make Call
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
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
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Follow-ups */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Today's Follow-ups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayFollowups.map((followup) => (
                <div key={followup.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{followup.name}</h3>
                    <p className="text-sm text-gray-600">{followup.company}</p>
                    <p className="text-sm text-gray-500">Agent: {followup.agent}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{followup.time}</p>
                      <Badge variant={followup.priority === 'high' ? 'destructive' : followup.priority === 'medium' ? 'default' : 'secondary'}>
                        {followup.priority}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCall(followup)}
                      className="ml-2"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overdue Follow-ups */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              Overdue Follow-ups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overdueFollowups.map((followup) => (
                <div key={followup.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{followup.name}</h3>
                    <p className="text-sm text-gray-600">{followup.company}</p>
                    <p className="text-sm text-gray-500">Agent: {followup.agent}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium text-red-600">{followup.daysOverdue} days overdue</p>
                      <Badge variant={followup.priority === 'high' ? 'destructive' : 'default'}>
                        {followup.priority}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCall(followup)}
                      className="ml-2 border-red-200 hover:bg-red-50"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call Notes Modal */}
      {callNotesLead && (
        <CallNotesModal
          lead={callNotesLead}
          isOpen={!!callNotesLead}
          onClose={() => setCallNotesLead(null)}
          onSave={handleCallNotesSave}
        />
      )}
    </div>
  );
};

export default Dashboard;
