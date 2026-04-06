import { Request, Response, NextFunction } from 'express';
import { campgroundSchema, reviewSchema } from './schemas';
import ExpressError from './utils/ExpressError';
import Campground from './models/campground';
import Review from './models/review';

export const isLoggedIn = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        res.redirect('/login');
        return;
    }
    next();
};

export const validateCampground = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { error } = campgroundSchema.validate(req.body);
    console.log(req.body);

    if (error) {
        const msg = error.details.map((el: any) => el.message).join(',');
        throw new ExpressError(msg, 400);
    }

    next();
};

export const isAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id } = req.params;
    const campground = await Campground.findById(id);

    if (!campground) {
        throw new ExpressError('Campground not found', 404);
    }

    if (!req.user || !campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        res.redirect(`/campgrounds/${id}`);
        return;
    }

    next();
};

export const isReviewAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        throw new ExpressError('Review not found', 404);
    }

    if (!req.user || !review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        res.redirect(`/campgrounds/${id}`);
        return;
    }

    next();
};

export const validateReview = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const msg = error.details.map((el: any) => el.message).join(',');
        throw new ExpressError(msg, 400);
    }

    next();
};