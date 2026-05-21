class AppException(Exception):
    def __init__(self, message: str, status_code: int = 400, error_code: str = None):
        self.message = message
        self.status_code = status_code
        self.error_code = error_code
        super().__init__(message)


class AuthenticationError(AppException):
    def __init__(self, message: str = "Invalid credentials"):
        super().__init__(
            message=message,
            status_code=401,
            error_code="AUTH_001"
        )

class UnauthorizedException(AppException):
    def __init__(self, message="Unauthorized"):
        super().__init__(message, status_code=401)

        
class AuthorizationError(AppException):
    def __init__(self, message: str = "Not authorized"):
        super().__init__(
            message=message,
            status_code=403,
            error_code="AUTH_002"
        )


class ConflictError(AppException):
    def __init__(self, message: str = "Resource already exists"):
        super().__init__(
            message=message,
            status_code=409,
            error_code="CONFLICT_001"
        )


class NotFoundError(AppException):
    def __init__(self, message: str = "Resource not found"):
        super().__init__(
            message=message,
            status_code=404,
            error_code="NOT_FOUND_001"
        )


class BadRequestError(AppException):
    def __init__(self, message: str = "Bad request"):
        super().__init__(
            message=message,
            status_code=400,
            error_code="BAD_REQUEST_001"
        )