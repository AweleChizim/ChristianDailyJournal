from typing import Any, Mapping
from google.auth.transport import requests
from google.oauth2 import id_token
from app.core.config import settings


class GoogleAuthService:

    @staticmethod
    def verify_token(
        credential: str,
    ) -> Mapping[str, Any]:

        payload = id_token.verify_oauth2_token(
            credential,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID,
        )

        return payload