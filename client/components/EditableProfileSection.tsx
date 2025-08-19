import { useState } from "react";
import { Edit3, Plus, X, Save, MapPin, Briefcase, GraduationCap, Heart, Globe, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { WorkInfo, EducationInfo } from "@shared/types";
import { toast } from "sonner";

interface EditableWorkSectionProps {
  workInfo: WorkInfo[];
  onUpdate: (work: WorkInfo[]) => void;
}

export function EditableWorkSection({ workInfo, onUpdate }: EditableWorkSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newWork, setNewWork] = useState<Partial<WorkInfo>>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    location: "",
    description: ""
  });

  const addWork = () => {
    if (newWork.company && newWork.position && newWork.startDate) {
      const work: WorkInfo = {
        id: Date.now().toString(),
        company: newWork.company,
        position: newWork.position,
        startDate: newWork.startDate,
        endDate: newWork.endDate || undefined,
        location: newWork.location || undefined,
        description: newWork.description || undefined
      };
      onUpdate([...workInfo, work]);
      setNewWork({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        location: "",
        description: ""
      });
      setIsAdding(false);
      toast.success("Work experience added!");
    }
  };

  const removeWork = (id: string) => {
    onUpdate(workInfo.filter(w => w.id !== id));
    toast.success("Work experience removed!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Work
          <Button size="sm" variant="outline" onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {workInfo.map((work) => (
          <div key={work.id} className="flex items-start gap-3 group">
            <Briefcase className="h-5 w-5 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">{work.position}</p>
              <p className="text-sm text-muted-foreground">
                {work.company} • {work.startDate}{work.endDate ? ` - ${work.endDate}` : ' - Present'}
              </p>
              {work.location && (
                <p className="text-sm text-muted-foreground">{work.location}</p>
              )}
              {work.description && (
                <p className="text-sm mt-1">{work.description}</p>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeWork(work.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {isAdding && (
          <div className="p-4 border rounded-lg space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Position</Label>
                <Input
                  placeholder="Software Developer"
                  value={newWork.position || ""}
                  onChange={(e) => setNewWork({ ...newWork, position: e.target.value })}
                />
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  placeholder="Builder.io"
                  value={newWork.company || ""}
                  onChange={(e) => setNewWork({ ...newWork, company: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Start Date</Label>
                <Input
                  placeholder="January 2023"
                  value={newWork.startDate || ""}
                  onChange={(e) => setNewWork({ ...newWork, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label>End Date (optional)</Label>
                <Input
                  placeholder="Present"
                  value={newWork.endDate || ""}
                  onChange={(e) => setNewWork({ ...newWork, endDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Location (optional)</Label>
              <Input
                placeholder="Dhaka, Bangladesh"
                value={newWork.location || ""}
                onChange={(e) => setNewWork({ ...newWork, location: e.target.value })}
              />
            </div>
            <div>
              <Label>Description (optional)</Label>
              <Textarea
                placeholder="Describe your role and responsibilities..."
                value={newWork.description || ""}
                onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addWork}>Save</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface EditableEducationSectionProps {
  educationInfo: EducationInfo[];
  onUpdate: (education: EducationInfo[]) => void;
}

export function EditableEducationSection({ educationInfo, onUpdate }: EditableEducationSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newEducation, setNewEducation] = useState<Partial<EducationInfo>>({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startYear: "",
    endYear: ""
  });

  const addEducation = () => {
    if (newEducation.school && newEducation.startYear) {
      const education: EducationInfo = {
        id: Date.now().toString(),
        school: newEducation.school,
        degree: newEducation.degree || undefined,
        fieldOfStudy: newEducation.fieldOfStudy || undefined,
        startYear: newEducation.startYear,
        endYear: newEducation.endYear || undefined
      };
      onUpdate([...educationInfo, education]);
      setNewEducation({
        school: "",
        degree: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: ""
      });
      setIsAdding(false);
      toast.success("Education added!");
    }
  };

  const removeEducation = (id: string) => {
    onUpdate(educationInfo.filter(e => e.id !== id));
    toast.success("Education removed!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Education
          <Button size="sm" variant="outline" onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {educationInfo.map((education) => (
          <div key={education.id} className="flex items-start gap-3 group">
            <GraduationCap className="h-5 w-5 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">{education.school}</p>
              {education.degree && (
                <p className="text-sm text-muted-foreground">
                  {education.degree}{education.fieldOfStudy ? `, ${education.fieldOfStudy}` : ''}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                {education.startYear}{education.endYear ? ` - ${education.endYear}` : ' - Present'}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeEducation(education.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {isAdding && (
          <div className="p-4 border rounded-lg space-y-3">
            <div>
              <Label>School/University</Label>
              <Input
                placeholder="University of Dhaka"
                value={newEducation.school || ""}
                onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Degree (optional)</Label>
                <Input
                  placeholder="Bachelor's degree"
                  value={newEducation.degree || ""}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                />
              </div>
              <div>
                <Label>Field of Study (optional)</Label>
                <Input
                  placeholder="Computer Science"
                  value={newEducation.fieldOfStudy || ""}
                  onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Start Year</Label>
                <Input
                  placeholder="2018"
                  value={newEducation.startYear || ""}
                  onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
                />
              </div>
              <div>
                <Label>End Year (optional)</Label>
                <Input
                  placeholder="2022"
                  value={newEducation.endYear || ""}
                  onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addEducation}>Save</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface EditableContactInfoProps {
  email?: string;
  phone?: string;
  website?: string;
  onUpdate: (info: { email?: string; phone?: string; website?: string }) => void;
}

export function EditableContactInfo({ email, phone, website, onUpdate }: EditableContactInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState({ email: email || "", phone: phone || "", website: website || "" });

  const saveContactInfo = () => {
    onUpdate(contactInfo);
    setIsEditing(false);
    toast.success("Contact info updated!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Contact Info
          <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            <Edit3 className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                placeholder="+88 01700 000000"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                placeholder="www.yourwebsite.com"
                value={contactInfo.website}
                onChange={(e) => setContactInfo({ ...contactInfo, website: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={saveContactInfo}>Save</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {email && (
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{phone}</span>
              </div>
            )}
            {website && (
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4" />
                <span className="text-sm">{website}</span>
              </div>
            )}
            {!email && !phone && !website && (
              <p className="text-sm text-muted-foreground">No contact info added</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface EditableBasicInfoProps {
  birthday?: string;
  relationshipStatus?: string;
  location?: string;
  languages?: string[];
  onUpdate: (info: { birthday?: string; relationshipStatus?: string; location?: string; languages?: string[] }) => void;
}

export function EditableBasicInfo({ birthday, relationshipStatus, location, languages, onUpdate }: EditableBasicInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    birthday: birthday || "",
    relationshipStatus: relationshipStatus || "",
    location: location || "",
    languages: languages?.join(', ') || ""
  });

  const saveBasicInfo = () => {
    onUpdate({
      ...basicInfo,
      languages: basicInfo.languages ? basicInfo.languages.split(',').map(l => l.trim()) : []
    });
    setIsEditing(false);
    toast.success("Basic info updated!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Basic Info
          <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            <Edit3 className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <Label>Birthday</Label>
              <Input
                placeholder="January 15, 1998"
                value={basicInfo.birthday}
                onChange={(e) => setBasicInfo({ ...basicInfo, birthday: e.target.value })}
              />
            </div>
            <div>
              <Label>Relationship Status</Label>
              <Select value={basicInfo.relationshipStatus} onValueChange={(value) => setBasicInfo({ ...basicInfo, relationshipStatus: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="In a relationship">In a relationship</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Complicated">It's complicated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Location</Label>
              <Input
                placeholder="Dhaka, Bangladesh"
                value={basicInfo.location}
                onChange={(e) => setBasicInfo({ ...basicInfo, location: e.target.value })}
              />
            </div>
            <div>
              <Label>Languages (comma separated)</Label>
              <Input
                placeholder="Bengali, English, Hindi"
                value={basicInfo.languages}
                onChange={(e) => setBasicInfo({ ...basicInfo, languages: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={saveBasicInfo}>Save</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {birthday && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Birthday</span>
                <span className="text-sm">{birthday}</span>
              </div>
            )}
            {relationshipStatus && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Relationship</span>
                <span className="text-sm">{relationshipStatus}</span>
              </div>
            )}
            {location && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="text-sm">{location}</span>
              </div>
            )}
            {languages && languages.length > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Languages</span>
                <span className="text-sm">{languages.join(', ')}</span>
              </div>
            )}
            {!birthday && !relationshipStatus && !location && (!languages || languages.length === 0) && (
              <p className="text-sm text-muted-foreground">No basic info added</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
