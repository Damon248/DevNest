const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");

// @route GET api/profile/me
// @desc Get current user's profile
// @access private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "No profile is there for this user!" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// @route POST api/profile
// @desc Create/update user profile
// @access private

router.post(
  "/",
  auth,
  [
    check("status", "Status is required!").notEmpty(),
    check("skills", "Skills are required!").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Create profile object

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // Check if profile already exists, then update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // If not, create new profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error!");
    }
  }
);

module.exports = router;
