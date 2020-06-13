import { IJourney, JOURNEY, JOURNEY_BASIC } from "../consts/journey";

export default interface IProfile {
    id: string
    name: string
    givenName: string
    familyName: string
    imageURL: string
    email?: string
}

export interface ISession {
    profile: IProfile
    journey: IJourney
}

const fromGoogleProfile = (profile: any): IProfile => {
    return {
        id: profile.sub,
        name: profile.name,
        givenName: profile.given_name,
        familyName: profile.family_name,
        imageURL: profile.picture,
        email: profile.email,
    };
};

const session = (req, res) => {
    let profile;
    if (req.authToken?.provider == "GOOGLE" && req.authToken?.token) {
        profile = fromGoogleProfile(req.authToken.token)
    }

    if (profile) {
        res.json({
            profile,
            journey: JOURNEY
        })
    } else {
        console.log("No profile")
        res.json({
            journey: JOURNEY_BASIC
        })
    }
}

export { session }