
import React, { useState } from 'react';
import { Calendar, Clock, User, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CallNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadName: string;
  leadCompany: string;
}

const CallNotesModal = ({ isOpen, onClose, leadName, leadCompany }: CallNotesModalProps) => {
  const [callNotes, setCallNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpTime, setFollowUpTime] = useState('');
  const [callOutcome, setCallOutcome] = useState('');
  const [nextAction, setNextAction] = useState('');

  const handleSave = () => {
    // Here you would typically save the call notes to your backend
    console.log('Saving call notes:', {
      callNotes,
      followUpDate,
      followUpTime,
      callOutcome,
      nextAction
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl">Call Notes</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {leadName} - {leadCompany}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Call Outcome */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Call Outcome</label>
            <Select value={callOutcome} onValueChange={setCallOutcome}>
              <SelectTrigger>
                <SelectValue placeholder="Select call outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="answered">Answered</SelectItem>
                <SelectItem value="voicemail">Left Voicemail</SelectItem>
                <SelectItem value="no-answer">No Answer</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="not-interested">Not Interested</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Call Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Call Notes</label>
            <Textarea
              placeholder="Enter your call notes here..."
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          {/* Next Action */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Next Action</label>
            <Select value={nextAction} onValueChange={setNextAction}>
              <SelectTrigger>
                <SelectValue placeholder="Select next action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="follow-up-call">Follow-up Call</SelectItem>
                <SelectItem value="send-email">Send Email</SelectItem>
                <SelectItem value="send-proposal">Send Proposal</SelectItem>
                <SelectItem value="schedule-meeting">Schedule Meeting</SelectItem>
                <SelectItem value="qualify-further">Qualify Further</SelectItem>
                <SelectItem value="close">Close/Archive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Follow-up Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Follow-up Date
              </label>
              <Input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Follow-up Time
              </label>
              <Input
                type="time"
                value={followUpTime}
                onChange={(e) => setFollowUpTime(e.target.value)}
              />
            </div>
          </div>

          {/* Previous Call Notes */}
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Previous Call History
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Jan 15, 2024 - 2:30 PM</span>
                  <Badge variant="outline">Interested</Badge>
                </div>
                <p className="text-sm text-gray-700">
                  Initial contact call. Customer showed interest in our enterprise solution. 
                  Discussed pricing and implementation timeline. Agreed to send detailed proposal.
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Jan 10, 2024 - 10:15 AM</span>
                  <Badge variant="secondary">Left Voicemail</Badge>
                </div>
                <p className="text-sm text-gray-700">
                  Left detailed voicemail introducing our services and value proposition. 
                  Mentioned specific benefits for their industry.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Save Call Notes
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

export default CallNotesModal;
