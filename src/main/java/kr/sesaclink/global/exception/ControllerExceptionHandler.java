package kr.sesaclink.global.exception;

import kr.sesaclink.global.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
@RequiredArgsConstructor
@Log4j2
public class ControllerExceptionHandler {

    private final MessageService messageService;

    @ExceptionHandler(AccessDeniedException.class)
    public String handleAccessDeniedException(AccessDeniedException accessDeniedException,
                                              RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("message",
                messageService.getMessage("error.access_denied"));
        return "redirect:/";
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public String handleNoResourceFoundException(NoResourceFoundException noResourceFoundException,
                                                 RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("message",
                messageService.getMessage("error.no_resource_found"));
        return "redirect:/";
    }

    /*
    //비즈니스 로직에서 발생하는 BaseException 처리
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ExceptionResponse> handleBaseException(BaseException e) {
        log.error("BaseException: {}", e.getMessage());

        return createErrorResponse(e.getExceptionCode());
    }

    //데이터 바인딩 예외처리
    @ExceptionHandler(BindException.class)
    public ResponseEntity<ExceptionResponse> handleBindException(BindException e) {
        log.error("BindException: {}", e.getMessage());

        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors()
            .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        return createErrorResponse(ExceptionCode.INVALID_INPUT, errors);
    }

    //지원하지 않는 HTTP Method 호출 시 발생하는 예외 처리
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ExceptionResponse> handleMethodNotAllowed(
        HttpRequestMethodNotSupportedException e) {
        log.error("HttpRequestMethodNotSupportedException: {}", e.getMessage());

        return createErrorResponse(ExceptionCode.METHOD_NOT_ALLOWED);
    }

    //JSON 파싱 실패 시 발생하는 예외 처리
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionResponse> handleHttpMessageNotReadable(
        HttpMessageNotReadableException e) {
        log.error("HttpMessageNotReadableException: {}", e.getMessage());

        return createErrorResponse(ExceptionCode.INVALID_JSON_FORMAT);
    }

    //접근 권한이 없는 리소스에 접근할 때 발생하는 예외 처리
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ExceptionResponse> handleAccessDenied(AccessDeniedException e) {
        log.error("AccessDeniedException: {}", e.getMessage());

        return createErrorResponse(ExceptionCode.ACCESS_DENIED);
    }

    //데이터베이스 무결성 제약조건 위반 시 발생하는 예외 처리
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionResponse> handleDataIntegrityViolation(DataIntegrityViolationException e) {
        log.error("DataIntegrityViolationException: {}", e.getMessage());

        //FK 제약조건 위반 예외 처리
        if (isForeignKeyViolation(e)) {
            return createErrorResponse(ExceptionCode.FOREIGN_KEY_VIOLATION);
        }

        // 다른 데이터 무결성 위반 예외 처리
        return createErrorResponse(ExceptionCode.DATA_INTEGRITY_VIOLATION);
    }

    //예상치 못한 서버 에러 상황에 대한 예외 처리
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception e) {
        log.error("Exception: ", e);

        return createErrorResponse(ExceptionCode.INTERNAL_SERVER_ERROR);
    }

    //에러 응답 생성 메서드(에러 코드만 포함)
    private ResponseEntity<ExceptionResponse> createErrorResponse(ExceptionCode code) {
        return createErrorResponse(code, null);
    }

    //에러 응답 생성 메서드(상세 에러 정보 포함)
    private ResponseEntity<ExceptionResponse> createErrorResponse(ExceptionCode code, Map<String, String> errors) {

        ExceptionResponse response = ExceptionResponse.builder()
            .status(code.getStatus())
            .message(code.getMessage())
            .errors(errors)
            .build();

        return ResponseEntity.status(code.getStatus()).body(response);
    }

    //FK 관련 위반인지 판단 메서드
    private boolean isForeignKeyViolation(DataIntegrityViolationException e) {
        return e.getMessage().contains("foreign key constraint")
            || e.getMessage().contains("REFERENCES");
    }

    // 존재하지 않는 데이터 조회
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ExceptionResponse> handleNoSuchElementException(NoSuchElementException e) {
        log.error("NoSuchElementException: {}", e.getMessage());

        return createErrorResponse(ExceptionCode.NO_SUCH_ELEMENT);
    }

    // 로그인 실패
    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<ExceptionResponse> handleNoSuchElementException(InternalAuthenticationServiceException e) {
        log.error("InternalAuthenticationServiceException: {}", e.getMessage());

        return createErrorResponse(ExceptionCode.USER_NOT_FOUND);
    }
    */
}
