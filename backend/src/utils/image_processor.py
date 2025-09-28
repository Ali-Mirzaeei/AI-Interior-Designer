from PIL import Image
import io
import base64

async def process_image(image_data: bytes) -> Image.Image:
    """پردازش تصویر ورودی"""
    try:
        image = Image.open(io.BytesIO(image_data))
        # تبدیل به RGB اگر لازم است
        if image.mode in ('RGBA', 'P'):
            image = image.convert('RGB')
        return image
    except Exception as e:
        raise ValueError(f"خطا در پردازش تصویر: {str(e)}")

def image_to_base64(image: Image.Image, format: str = 'JPEG') -> str:
    """تبدیل تصویر به base64"""
    buffered = io.BytesIO()
    image.save(buffered, format=format)
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
    return f"data:image/{format.lower()};base64,{img_str}"

def create_test_svg(description: str, width: int = 600, height: int = 400) -> str:
    """ایجاد SVG تستی"""
    return f'''
    <svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f8fafc"/>
        <text x="50%" y="45%" font-size="24" fill="#334155" text-anchor="middle" font-family="Arial">
            🎨 طراحی تولید شده
        </text>
        <text x="50%" y="55%" font-size="16" fill="#475569" text-anchor="middle" font-family="Arial">
            سبک: {description}
        </text>
        <text x="50%" y="65%" font-size="12" fill="#64748b" text-anchor="middle" font-family="Arial">
            ابعاد: {width}x{height}px
        </text>
    </svg>
    '''