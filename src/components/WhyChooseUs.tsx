
import { Shield, Users, Clock, DollarSign, CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Users,
      title: "3 דורות של ניסיון וידע משפטי",
      description: "משרד משפחתי עם מסורת של מעל 40 שנה בתחום המקרקעין והצוואות"
    },
    {
      icon: Shield,
      title: "ליווי אישי וצמוד לאורך כל התהליך",
      description: "מהרגע הראשון ועד חתימה על המסמכים - אנחנו איתכם בכל שלב"
    },
    {
      icon: CheckCircle,
      title: "מאות עסקאות מוצלחות",
      description: "ניסיון עשיר ומוכח בהצלחת עסקאות מורכבות ומגוונות"
    },
    {
      icon: Clock,
      title: "זמינות מלאה ומענה מהיר",
      description: "מענה מיידי לפניותיכם ויעילות מקסימלית בטיפול"
    },
    {
      icon: DollarSign,
      title: "שקיפות מלאה בתהליך ובעלויות",
      description: "ללא הפתעות - כל העלויות ברורות מראש"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">