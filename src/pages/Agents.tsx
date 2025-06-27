
import React, { useState } from 'react';
import { Users, Phone, TrendingUp, Award, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Agents = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      phone: '+1 (555) 111-2222',
      leads: 15,
      callsMade: 23,
      qualified: 8,
      revenue: '₹125,000',
      performance: 'excellent',
      recentActivity: [
        { type: 'call', description: 'Called John Smith - Tech Corp', time: '10:30 AM' },
        { type: 'meeting', description: 'Meeting with Emma Wilson', time: '2:00 PM' },
        { type: 'followup', description: 'Follow-up with Robert Brown', time: '4:15 PM' }
      ]
    },
    {
      id: 2,
      name: 'Mike Davis',
      email: 'mike@company.com',
      phone: '+1 (555) 333-4444',
      leads: 12,
      callsMade: 18,
      qualified: 5,
      revenue: '₹87,500',
      performance: 'good',
      recentActivity: [
        { type: 'call', description: 'Called Lisa Garcia - Retail Plus', time: '9:15 AM' },
        { type: 'proposal', description: 'Sent proposal to Design Studio', time: '11:45 AM' },
        { type: 'followup', description: 'Email follow-up with Marketing Inc', time: '3:30 PM' }
      ]
    },
    {
      id: 3,
      name: 'Jennifer Lee',
      email: 'jennifer@company.com',
      phone: '+1 (555) 555-6666',
      leads: 18,
      callsMade: 28,
      qualified: 12,
      revenue: '₹156,000',
      performance: 'excellent',
      recentActivity: [
        { type: 'meeting', description: 'Client meeting - Fortune Corp', time: '8:30 AM' },
        { type: 'call', description: 'Cold call to New Prospect', time: '1:20 PM' },
        { type: 'deal', description: 'Closed deal worth ₹45,000', time: '5:00 PM' }
      ]
    }
  ]);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isAssignLeadOpen, setIsAssignLeadOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    email: '',
    phone: '',
    performance: 'good'
  });
  const [leadAssignment, setLeadAssignment] = useState({
    leadName: '',
    company: '',
    priority: 'medium'
  });

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.email || !newAgent.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const agent = {
      id: agents.length + 1,
      ...newAgent,
      leads: 0,
      callsMade: 0,
      qualified: 0,
      revenue: '₹0',
      recentActivity: []
    };

    setAgents([...agents, agent]);
    setNewAgent({ name: '', email: '', phone: '', performance: 'good' });
    setIsAddAgentOpen(false);
    toast({
      title: "Success",
      description: "Agent added successfully!"
    });
  };

  const handleAssignLead = () => {
    if (!leadAssignment.leadName || !leadAssignment.company) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: `Lead "${leadAssignment.leadName}" assigned to ${selectedAgent?.name}!`
    });
    setLeadAssignment({ leadName: '', company: '', priority: 'medium' });
    setIsAssignLeadOpen(false);
  };

  const getPerformanceBadge = (performance: string) => {
    return (
      <Badge variant={performance === 'excellent' ? 'default' : performance === 'good' ? 'secondary' : 'outline'}>
        {performance}
      </Badge>
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4 text-blue-500" />;
      case 'meeting': return <Calendar className="w-4 h-4 text-green-500" />;
      case 'followup': return <Mail className="w-4 h-4 text-orange-500" />;
      case 'proposal': return <TrendingUp className="w-4 h-4 text-purple-500" />;
      case 'deal': return <Award className="w-4 h-4 text-green-600" />;
      default: return <Users className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Agents</h1>
          <p className="text-gray-600 mt-1">Manage your sales team performance</p>
        </div>
        <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Users className="w-4 h-4 mr-2" />
              Add Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter agent name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="agent@company.com"
                  value={newAgent.email}
                  onChange={(e) => setNewAgent({...newAgent, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={newAgent.phone}
                  onChange={(e) => setNewAgent({...newAgent, phone: e.target.value})}
                />
              </div>
              <div>
                <Label>Performance Level</Label>
                <Select value={newAgent.performance} onValueChange={(value) => setNewAgent({...newAgent, performance: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddAgent} className="flex-1">Add Agent</Button>
                <Button variant="outline" onClick={() => setIsAddAgentOpen(false)} className="flex-1">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 bg-blue-100">
                  <AvatarFallback className="text-blue-600 font-semibold">
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <p className="text-sm text-gray-600">{agent.email}</p>
                </div>
                {getPerformanceBadge(agent.performance)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{agent.leads}</p>
                  <p className="text-sm text-gray-600">Active Leads</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{agent.qualified}</p>
                  <p className="text-sm text-gray-600">Qualified</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Calls Made:</span>
                  <span className="font-medium">{agent.callsMade}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Revenue:</span>
                  <span className="font-semibold text-green-600">{agent.revenue}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">{agent.phone}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
                <div className="space-y-2">
                  {agent.recentActivity.slice(0, 3).map((activity, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-gray-700">{activity.description}</p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedAgent(agent)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Agent Details - {selectedAgent?.name}</DialogTitle>
                    </DialogHeader>
                    {selectedAgent && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold mb-2">Contact Information</h3>
                            <div className="space-y-1 text-sm">
                              <p><span className="text-gray-500">Email:</span> {selectedAgent.email}</p>
                              <p><span className="text-gray-500">Phone:</span> {selectedAgent.phone}</p>
                              <p><span className="text-gray-500">Performance:</span> {selectedAgent.performance}</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Performance Metrics</h3>
                            <div className="space-y-1 text-sm">
                              <p><span className="text-gray-500">Active Leads:</span> {selectedAgent.leads}</p>
                              <p><span className="text-gray-500">Calls Made:</span> {selectedAgent.callsMade}</p>
                              <p><span className="text-gray-500">Qualified:</span> {selectedAgent.qualified}</p>
                              <p><span className="text-gray-500">Revenue:</span> {selectedAgent.revenue}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Recent Activity</h3>
                          <div className="space-y-2">
                            {selectedAgent.recentActivity.map((activity, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm p-2 bg-gray-50 rounded">
                                {getActivityIcon(activity.type)}
                                <div className="flex-1">
                                  <p className="text-gray-700">{activity.description}</p>
                                  <p className="text-gray-500 text-xs">{activity.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Dialog open={isAssignLeadOpen} onOpenChange={setIsAssignLeadOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedAgent(agent)}
                    >
                      Assign Lead
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Assign Lead to {selectedAgent?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="leadName">Lead Name</Label>
                        <Input
                          id="leadName"
                          placeholder="Enter lead name"
                          value={leadAssignment.leadName}
                          onChange={(e) => setLeadAssignment({...leadAssignment, leadName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          placeholder="Enter company name"
                          value={leadAssignment.company}
                          onChange={(e) => setLeadAssignment({...leadAssignment, company: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Priority</Label>
                        <Select value={leadAssignment.priority} onValueChange={(value) => setLeadAssignment({...leadAssignment, priority: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleAssignLead} className="flex-1">Assign Lead</Button>
                        <Button variant="outline" onClick={() => setIsAssignLeadOpen(false)} className="flex-1">Cancel</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Agents;
