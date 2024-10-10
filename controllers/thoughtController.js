const { User, Thought } = require('../models');

module.exports = {
  // Get all courses
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate('users');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .populate('users');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a course
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      await User.deleteMany({ _id: { $in: thought.users } });
      res.json({ message: 'Thought and users deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a course
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
        }

        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { users: req.params.thoughtId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: 'thought deleted, but no user found',
            });
        }

        res.json({ message: 'thought successfully deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

async addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);

    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reaction: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},
// Remove assignment from a student
async removeReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},
};
