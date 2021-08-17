const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connect = () => {
 if (process.env.NODE_ENV !== `production`) {
  mongoose.set("debug", true);
 }

 // 첫번째 파라미터가 db 연결 3번쨰 파라미터는 애러콜백 애러가 났을때 실행함
 mongoose.connect(
  `mongodb://${process.env.DB_ID}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_POST}/${process.env.DB_USER}`,
  {
   dbName: process.env.DB_NAME,
   useNewUrlParser: true,
   useCreateIndex: true,
  },
  (error) => {
   if (error) {
    console.log(error);
    console.log(`CONNECTION FAILED! TRY AGAIN!`);
   } else {
    console.log(`MONGODB CONNECTION SUCCESS!`);
   }
  }
 );
};

mongoose.connection.on(`error`, (error) => {
 console.log(error);
 console.log(`CONNECTION FAILED! TRY AGAIN!`);
 connect();
});

mongoose.connection.on(`disconnected`, () => {
 console.log(`CONNECTION FAILED! TRY AGAIN!`);
 connect();
});

module.exports = connect;
