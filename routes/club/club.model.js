const path = require('path');
const sequelize = require(path.join(__dirname, '../sequelize.js'));
const Sequelize = require("sequelize");

const Member = require(path.join(__dirname, '../model/member.js'));

// define sequelize club table
const Club = sequelize.define('CLUB', {
  club_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull : false
  },
  mem_id: {
    type: Sequelize.INTEGER,
    allowNull : false,
    references : {
      model:'MEMBER',
      key:'mem_id'
    }
  },
  club_photo: {
    type: Sequelize.STRING
  },
  club_nm: {
    type: Sequelize.STRING,
    allowNull : false
  },
  club_ex:{
      type: Sequelize.STRING,
      allowNull : false
  },
  club_copyright:{
      type : Sequelize.STRING,
      allowNull : false
  },
  club_phone: {
    type: Sequelize.STRING,
    validate : {
      is : /^[\d{3}-\d{4}-\d{4}]$/
    }
  },
  club_email: {
    type: Sequelize.STRING
  },
  club_college: {
    type: Sequelize.STRING,
    allowNull : false
    //Use career net open api
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull : false,
    references : {
      model:'CATEGORY',
      key:'cate_id'
    }
  },
  tag_id: {
    type: Sequelize.INTEGER,
    allowNull : false,
    references : {
      model:'TAG',
      key:'tag_id'
    }
  },
  club_history:{
      type:Sequelize.STRING
  },
  club_career:{
      type: Sequelize.BLOB('tiny') //use text editor
  },
  club_price_du:{
      type:Sequelize.STRING
  },
  club_views:{
      type:Sequelize.INTEGER,
      allowNull : false
  },
  union_enabled:{
      type:Sequelize.Instance,
      allowNull : false,
      comment : '1이면 연합'
  },
  club_ratings:{
      type:Sequelize.FLOAT,
      allowNull : false
  },
}, {
  freezeTableName: true,
  timestamps : true //createdAt, updatedAt 로 생성날짜와 수정날짜 저장.
});

module.exports = Club;