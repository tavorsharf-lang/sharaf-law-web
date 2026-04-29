
import { useState } from 'react';
import { Send, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  const services = [
    'רכישת דירה מיד שנייה',
    'רכישת דירה מקבלן',
    'מכירת דירה',
    'צוואות וירושות',
    'מיסוי מקרקעין',
    'ליווי משפטי כללי',
    'אחר'
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        title: "שגיאה",
        description: "אנא מלאו את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;