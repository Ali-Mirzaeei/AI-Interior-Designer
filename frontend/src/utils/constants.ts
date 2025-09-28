import { DesignStyle } from '../types';

export const DESIGN_STYLES: DesignStyle[] = [
  {
    id: 'modern',
    name: 'مدرن',
    emoji: '🏢',
    prompt: 'اتاق نشیمن مدرن با مبلمان ساده و خطوط تمیز، رنگ‌های خنثی و نورپردازی غیرمستقیم',
    description: 'سبک مدرن با خطوط تمیز و طراحی مینیمال'
  },
  {
    id: 'scandinavian',
    name: 'اسکاندیناوی',
    emoji: '❄️',
    prompt: 'سبک اسکاندیناوی با رنگ‌های روشن، چوب طبیعی، مبلمان راحت و فضای دلباز',
    description: 'طراحی شمال اروپا با روشنایی و سادگی'
  },
  {
    id: 'minimalist',
    name: 'مینیمال',
    emoji: '⬜',
    prompt: 'طراحی مینیمال با فضای باز، وسایل محدود و کاربردی، رنگ‌های خنثی و سطوح تمیز',
    description: 'کمترین وسایل، بیشترین تاثیر'
  },
  {
    id: 'industrial',
    name: 'صنعتی',
    emoji: '🏭',
    prompt: 'سبک صنعتی با آجر exposed، لوله‌های visible، متریال خام و نورپردازی صنعتی',
    description: 'احساس لافت و صنعتی با متریال خام'
  },
  {
    id: 'bohemian',
    name: 'بوهمین',
    emoji: '🌺',
    prompt: 'سبک بوهمین با رنگ‌های غنی، الگوهای مختلف، گیاهان و دکوراسیون اتنیک',
    description: 'رنگین‌کمانی از رنگ‌ها و بافت‌ها'
  },
  {
    id: 'coastal',
    name: 'ساحلی',
    emoji: '🏖️',
    prompt: 'سبک ساحلی با رنگ‌های آبی و سفید، چوب سفید شده، عناصر طبیعی و نور زیاد',
    description: 'احساس آرامش دریا و ساحل'
  }
];

export const API_ENDPOINTS = {
  GENERATE: 'http://localhost:8000/generate-design',
  UPLOAD: 'http://localhost:8000/upload',
  STYLES: 'http://localhost:8000/styles'
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
