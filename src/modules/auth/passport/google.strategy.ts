import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.CLIENT_KEY!,
            clientSecret: process.env.CLIENT_SECRET!,
            callbackURL: 'http://localhost:8080/api/v1.0/auth/google',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string, 
        refreshToken: string, 
        profile: any, 
        done: VerifyCallback
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            providerId: profile.id,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
            refreshToken
        }
        done(null, user);
    }
}