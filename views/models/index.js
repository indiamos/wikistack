var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  // logging: false
});

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //   is: /^[a-z_\-]+$/i
    // }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  route: {
    type: Sequelize.VIRTUAL,
    get: function() {
      return '/wiki/' + this.urlTitle;
    },
    set: function(value) {
      this.setDataValue('urlTitle', value.slice(5));
    }
  }
});

Page.hook('beforeValidate', function(page, options){
  page.urlTitle = generateURL(page.title);
})

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

function generateURL(title){
      if (title) return title.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase();
      else return Math.random().toString(36).substring(2, 7);
    }


module.exports = {
  db: db,
  Page: Page,
  User: User
};
