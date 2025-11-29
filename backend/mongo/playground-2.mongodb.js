/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
// DB선택
use('testMongo');

// Collection 전체 삭제
for (const { name } of db.getCollectionInfos()) {
  db.getCollection(name).drop();
}


// Insert a few documents into the sales collection.
// 'sales' 컬렉션에 몇 가지 문서(document) 삽입
// MySQL의 row(행) 삽입(insert)에 해당함
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'ABC', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'ghi', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);
/* MySQL
INSERT INTO sales (item, price, quantity, date) VALUES
('abc', 10, 2, '2014-03-01 08:00:00'),
('jkl', 20, 1, '2014-03-01 09:00:00'),
...
('def', 7.5, 10, '2015-09-10 08:43:00'),
('abc', 10, 5, '2016-02-06 20:20:13');
*/


// updateOne() / updateMany()
// Update the price of a single item.
// 단일 문서의 가격을 수정한다.
// MySQL UPDATE에 해당
db.getCollection('sales').updateOne(
  { item: "abc" },              // WHERE item = 'abc'
  { $set: { price: 15 } }       // SET price = 15
);
/* MySQL
UPDATE sales
SET price = 15
WHERE item = 'abc'
LIMIT 1;
*/

// Increase quantity by 1 for all items with price >= 10.
// 가격이 10 이상인 모든 문서의 quantity(수량)를 1 증가시킨다.
// MySQL의 UPDATE (여러 행) 에 해당
db.getCollection('sales').updateMany(
  { price: { $gte: 10 } },      // WHERE price >= 10
  { $inc: { quantity: 1 } }     // quantity = quantity + 1
);
/* MySQL
UPDATE sales
SET quantity = quantity + 1
WHERE price >= 10;
*/



// deleteOne() / deleteMany()
// Delete one document where item is 'def'.
// item이 'def'인 문서 하나를 삭제한다.
// MySQL DELETE와 동일
db.getCollection('sales').deleteOne(
  { item: "def" }               // WHERE item = 'def'
);
/* MySQL
DELETE FROM sales
WHERE item = 'def'
LIMIT 1;
*/

// Delete all documents with quantity < 3.
// quantity가 3 미만인 모든 문서를 삭제한다.
// MySQL의 다중 삭제 DELETE와 동일
db.getCollection('sales').deleteMany(
  { quantity: { $lt: 3 } }      // WHERE quantity < 3
);
/* MySQL
DELETE FROM sales
WHERE quantity < 3;
*/

// Find
// Run a find command to view items sold on April 4th, 2014.
// 찾기(find) 명령을 실행하여 2014년 4월 4일에 판매된 상품을 확인.
// MySQL의 SELECT에 해당
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();


// Print a message to the output window.
// 콘솔에 메세지 출력
console.log(`${salesOnApril4th} sales occurred in 2014.`);



// Aggregate
// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
// 여기서는 집계(aggregation)를 실행하고, 결과에 대한 커서를 연다.
// 전체 결과를 모두 가져오려면 '.toArray()'를 사용한다.
// 페이지 단위로 결과를 순차적으로 보고 싶다면 '.hasNext()' / '.next()'를 사용할 수 있다.

db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  // 2014년에 발생한 모든 매출 찾기
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  // 각 제품의 총 판매량을 그룹화한다.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } },
  { $out: "sales_summary_2014" }
]);


/* aggregation 보충 설명
MySQL의 SELECT + GROUP BY + SUM + JOIN
*/
// MongoDB
db.sales.aggregate([
  { $match: { year: 2014 } },
  { $group: { _id: "$item", totalQty: { $sum: "$quantity" } } },
]);
// sales Table(Collection)의 year이 2014인 item을 모두 더한다. 

/* MySQL
SELECT item, SUM(quantity)
FROM sales
WHERE year = 2014
GROUP BY item;
*/

db.sales_summary_2014.find().toArray();
db.sales_summary_qty_2014.find().toArray();

// 실행 결과(컬렉션 구조) 확인
db.getCollectionInfos();