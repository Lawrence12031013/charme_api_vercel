export const errorMessage = (status, message, err) => {
    const error = new Error()
    const origeErr = err?.message
    error.status = status
    // error.message = message+ `\n錯誤詳細描述：` + origeErr
    error.message = message
    return error
}