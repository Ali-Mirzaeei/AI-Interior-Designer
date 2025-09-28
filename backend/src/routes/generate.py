# backend/src/routes/generate.py
from fastapi import APIRouter, UploadFile, Form
from fastapi.responses import JSONResponse
import os
import logging

try:
    import requests
except ImportError:
    raise RuntimeError("Missing 'requests' package. Run 'pip install requests' in your venv.")

router = APIRouter()
logger = logging.getLogger(__name__)

STABILITY_API_KEY = os.getenv("STABILITY_API_KEY")
if not STABILITY_API_KEY:
    logger.error("STABILITY_API_KEY not set in environment. Please set it in .env or env vars.")

TEXT_TO_IMAGE_URL = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"
IMAGE_TO_IMAGE_URL = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image"

@router.post("/generate-design")
async def generate_design(description: str = Form(...), image: UploadFile = None):
    try:
        if not STABILITY_API_KEY:
            return JSONResponse(status_code=500, content={"success": False, "message": "STABILITY_API_KEY is not configured on server."})

        headers = {"Authorization": f"Bearer {STABILITY_API_KEY}"}

        if image is None:
            # Text-to-Image → می‌تونیم سایز بدیم
            payload = {
                "text_prompts": [{"text": description}],
                "cfg_scale": 7,
                "height": 512,
                "width": 512,
                "samples": 1,
                "steps": 30,
            }
            headers["Content-Type"] = "application/json"
            response = requests.post(TEXT_TO_IMAGE_URL, headers=headers, json=payload)
        else:
            # Image-to-Image → سایز نباید داده بشه (خود API از سایز init_image استفاده می‌کنه)
            files = {
                "init_image": (image.filename, await image.read(), image.content_type),
                "text_prompts[0][text]": (None, description),
                "cfg_scale": (None, "7"),
                "samples": (None, "1"),
                "steps": (None, "30"),
                "image_strength": (None, "0.30"),  # 👈 تغییر محسوس (کمتر = تغییر بیشتر)
            }
            response = requests.post(IMAGE_TO_IMAGE_URL, headers=headers, files=files)

        if response.status_code != 200:
            logger.error("Stability API error: %s", response.text)
            return JSONResponse(status_code=500, content={"success": False, "message": f"Error: {response.text}"})

        data = response.json()
        image_base64 = data["artifacts"][0]["base64"]

        return JSONResponse(content={"success": True, "image_base64": image_base64})
    except Exception as e:
        logger.exception("Error in generate_design")
        return JSONResponse(status_code=500, content={"success": False, "message": str(e)})
