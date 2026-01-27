export class CreateAuthAccountDto {
    userId: string
    provider: string
    providerUserId: string
    accessToken?: string
    refreshToken?: string
}
