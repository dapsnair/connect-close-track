
import React, { useState } from 'react';
import { Calendar, Clock, User, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lead } from '@/pages/Leads';

interface ScheduleModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onSave: (leadId: number, scheduleData: any) => void;
}

const ScheduleModal = ({ lead, isOpen, onClose, onSave }: ScheduleModalProps) => {
  const [meetingType, setMeetingType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('30');
  const [location, setLocation] = useState('');
  const [agenda, setAgenda] = useState('');
  const [reminder, setReminder] = useState('15');

  const handleSave = () => {
    const scheduleData = {
      meetingType,
      date,
      time,
      duration,
      location,
      agenda,
      reminder
    };
    
    console.log('Scheduling meeting:', scheduleData);
    onSave(lead.id, scheduleData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl">Schedule Meeting</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {lead.name} - {lead.company}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Meeting Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Meeting Type</label>
            <Select value={meetingType} onValueChange={setMeetingType}>
              <SelectTrigger>
                <SelectValue placeholder="Select meeting type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discovery">Discovery Call</SelectItem>
                <SelectItem value="demo">Product Demo</SelectItem>
                <SelectItem value="proposal">Proposal Presentation</SelectItem>
                <SelectItem value="negotiation">Contract Negotiation</SelectItem>
                <SelectItem value="follow-up">Follow-up Meeting</SelectItem>
                <SelectItem value="closing">Closing Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Meeting Date
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Meeting Time
              </label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {/* Duration and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Duration (minutes)</label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location/Platform
              </label>
              <Input
                placeholder="Office, Zoom, Teams, etc."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Agenda */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Meeting Agenda</label>
            <Textarea
              placeholder="Enter meeting agenda and objectives..."
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Reminder */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Reminder</label>
            <Select value={reminder} onValueChange={setReminder}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 minutes before</SelectItem>
                <SelectItem value="15">15 minutes before</SelectItem>
                <SelectItem value="30">30 minutes before</SelectItem>
                <SelectItem value="60">1 hour before</SelectItem>
                <SelectItem value="1440">1 day before</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Information */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Contact Information
            </h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p><strong>Email:</strong> {lead.email}</p>
              <p><strong>Phone:</strong> {lead.phone}</p>
              <p><strong>Assigned Agent:</strong> {lead.agent}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Schedule Meeting
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleModal;
