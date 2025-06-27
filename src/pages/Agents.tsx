
import React from 'react';
import { Users, Phone, TrendingUp, Award, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Agents = () => {
  const agents = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      phone: '+1 (555) 111-2222',
      leads: 15,
      callsMade: 23,
      qualified: 8,
      revenue: '$125,000',
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
      revenue: '$87,500',
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
      revenue: '$156,000',
      performance: 'excellent',
      recentActivity: [
        { type: 'meeting', description: 'Client meeting - Fortune Corp', time: '8:30 AM' },
        { type: 'call', description: 'Cold call to New Prospect', time: '1:20 PM' },
        { type: 'deal', description: 'Closed deal worth $45,000', time: '5:00 PM' }
      ]
    }
  ];

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
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Users className="w-4 h-4 mr-2" />
          Add Agent
        </Button>
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
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Assign Lead
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Agents;
