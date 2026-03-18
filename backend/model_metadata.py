MODEL_METADATA = {
    "gemma3:270m": {
        "company": "Google",
        "companyUrl": "https://ai.google.dev/",
        "price": "$0.00",
        "availability": "Self-Host",
        "releaseDate": "2025-03-12",
        "summary": "Gemma 3 270M is Google's smallest Gemma 3 model, designed for on-device and edge use cases. Despite its compact size, it delivers competitive language understanding and generation capabilities.",
    },
    "gemma3": {
        "company": "Google",
        "companyUrl": "https://ai.google.dev/",
        "price": "$0.00",
        "availability": "Self-Host",
        "releaseDate": "2025-03-12",
        "summary": "Gemma 3 is Google's latest open model family built on the same research as Gemini. It supports multimodal input, long context windows up to 128K tokens, and is available in multiple sizes.",
    },
    "llama3.1": {
        "company": "Meta",
        "companyUrl": "https://ai.meta.com/",
        "price": "$0.00",
        "availability": "Self-Host",
        "releaseDate": "2024-07-23",
        "summary": "Llama 3.1 is Meta's open-source LLM family, featuring improved reasoning, coding, and multilingual capabilities. Available in 8B, 70B, and 405B parameter variants.",
    },
    "ministral-3b": {
        "company": "Mistral AI",
        "companyUrl": "https://mistral.ai/",
        "price": "$0.00",
        "availability": "Self-Host",
        "releaseDate": "2024-10-07",
        "summary": "Ministral 3B is Mistral AI's compact edge model optimised for low-latency inference. It excels at local and on-device tasks while maintaining strong instruction-following performance.",
    },
    "qwen2.5:0.5b": {
        "company": "Alibaba Cloud",
        "companyUrl": "https://qwenlm.github.io/",
        "price": "$0.00",
        "availability": "API Access",
        "releaseDate": "2024-09-19",
        "summary": "Qwen2.5 0.5B is the smallest model in Alibaba's Qwen2.5 series. It is designed for ultra-lightweight deployments and supports a wide range of languages with improved instruction following.",
    },
    "smollm2:135m": {
        "company": "HuggingFace",
        "companyUrl": "https://huggingface.co/",
        "price": "$0.00",
        "availability": "Self-Host",
        "releaseDate": "2024-11-01",
        "summary": "SmolLM2 135M is HuggingFace's smallest language model, purpose-built for on-device inference. It offers strong performance for its size on tasks like summarisation and Q&A.",
    },
    "ministral-3:3b": {
        "company": "Mistral AI",
        "companyUrl": "https://mistral.ai/",
        "price": "$0.00",
        "availability": "Website Chatbot",
        "releaseDate": "2024-10-07",
        "summary": "Ministral 3 3B is Mistral AI's mid-sized model optimised for a balance of performance and efficiency. It delivers strong results on a wide range of tasks while remaining suitable for edge deployment.",
    },
}


def get_model_metadata(model_name: str) -> dict:
    """Match model name to metadata using substring matching."""
    n = model_name.lower()
    for key, meta in MODEL_METADATA.items():
        if key.lower() in n or n in key.lower():
            return meta
    return {}
