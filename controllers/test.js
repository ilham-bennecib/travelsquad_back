//destructuration
const {
  name,
  start,
  end,
  language,
  content ,
  country ,
  max_members,
  city ,
  theme_id,
  creator_id

} = req.body;


const name = req.body.name;
const start = req.body.start;
const end = req.body.end;


//spread
const id = 1;
const body = { name : ilham, age : 36};

const together = {...body,id};


