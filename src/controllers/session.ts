import { IJourney, JOURNEY, JOURNEY_BASIC } from "../consts/journey";
import User from '../models/user'

export default interface IProfile {
    google_id: string
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
        google_id: profile.sub,
        name: profile.name,
        givenName: profile.given_name,
        familyName: profile.family_name,
        imageURL: profile.picture,
        email: profile.email,
    };
};

const session = async (req, res) => {
    let profile;
    if (req.authToken?.provider == "GOOGLE" && req.authToken?.token) {
        profile = fromGoogleProfile(req.authToken.token)
    }

    if (profile) {
        const updateResult = await User.findOneAndUpdate({ email: profile.email }, profile, { upsert: true, new: true })
        console.log("Updated user:", updateResult)
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