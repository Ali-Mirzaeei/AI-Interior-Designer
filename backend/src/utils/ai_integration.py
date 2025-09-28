# backend/src/utils/ai_integration.py
import os
import requests

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


async def generate_with_openai(image_data: bytes, description: str) -> str:
    """
    تولید طراحی داخلی با OpenAI DALL·E 2 (ارزان‌تر).
    خروجی: URL تصویر تولیدی.
    """
    url = "https://api.openai.com/v1/images/generations"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "dall-e-2",         # مدل ارزون
        "prompt": description,       # توضیحات کاربر
        "size": "256x256",           # سایز پایین برای صرفه‌جویی
        "n": 1
    }

    response = requests.post(url, headers=headers, json=payload)
    result = response.json()

    if "data" in result and len(result["data"]) > 0:
        return result["data"][0]["url"]
    else:
        raise Exception(f"❌ خطا در OpenAI: {result}")


async def generate_design_with_ai(image_data: bytes, description: str) -> str:
    """
    انتخاب Provider و تولید تصویر.
    فعلاً فقط OpenAI پیاده‌سازی شده.
    """
    ai_provider = os.getenv("AI_PROVIDER", "OPENAI")

    if ai_provider == "OPENAI":
        return await generate_with_openai(image_data, description)
    else:
        # حالت تست
        return "https://via.placeholder.com/256x256.png?text=TEST+IMAGE"
