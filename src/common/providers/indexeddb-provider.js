const DB_NAME = 'movie-store-indexeddb-app';
const DB_VERSION = 1234567890; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'favorites-movie';

// Show error in console
let logerr = (err) => {
	console.log(err);
};

class IDB {
	constructor() {
		// In the following line, you should include the prefixes of implementations you want to test.
		this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		// DON'T use "indexedDB = ..." if you're not in a function.
		// Moreover, you may need references to some window.IDB* objects:
		this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
		this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
		// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
		this.db_store_name = DB_STORE_NAME;
	}

	// GETTERS AND SETTERS
	get store_name() {
		return this.db_store_name;
	}

	set store_name(newValue) {
		this.db_store_name = newValue;
	}

	// METHOD IMPLEMENTATION
	// === Open DataBase ===
	connectDB(callback){
		let request = this.indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = logerr;

		request.onsuccess = () => {
			callback(request.result);
		};

		request.onupgradeneeded = (event) => {
			let objectStore = event.currentTarget.result.createObjectStore(this.db_store_name, {keyPath: "id"});
			objectStore.createIndex("title", "title", { unique: false });
			objectStore.createIndex("poster_path", "poster_path", { unique: false });
			objectStore.createIndex("vote_average", "vote_average", { unique: false });
			objectStore.createIndex("vote_count", "vote_count", { unique: false });
			objectStore.createIndex("release_date", "release_date", { unique: false });
			objectStore.createIndex("is_favorite", "is_favorite", { unique: false });

			this.connectDB(callback);
		}
	}

	// === Put data ===
	putData(id, title, poster_path, vote_average, vote_count, release_date, is_favorite) {
		console.log(id, title, poster_path, vote_average, vote_count, release_date, is_favorite);

		this.connectDB((db) => {
			let request = db
				.transaction(this.db_store_name, "readwrite")
				.objectStore(this.db_store_name)
				.put({
					id: id,
					title: title,
					poster_path: poster_path,
					vote_average: vote_average,
					vote_count: vote_count,
					release_date: release_date,
					is_favorite: is_favorite,
				});

			request.onerror = logerr;

			request.onsuccess = function(){
				return request.result;
			}
		});

	}

	// === Read all record ===
	readAllData(callback) {

		this.connectDB((db) => {
			let rows = [],
				store = db
					.transaction(this.db_store_name, "readonly")
					.objectStore(this.db_store_name);

			if (store.mozGetAll) {
				store.mozGetAll().onsuccess = function (e) {
					callback(e.target.result);
				};
			} else {
				store.openCursor().onsuccess = function (e) {
					let cursor = e.target.result;
					if (cursor) {
						rows.push(cursor.value);
						cursor.continue();
					}
					else {
						callback(rows);
					}
				};
			}
		});

	}

	// === Delete one record by id ===
	deleteDataById(id) {

		this.connectDB((db) => {
			let request = db
				.transaction(this.db_store_name, "readwrite")
				.objectStore(this.db_store_name)
				.delete(id);

			request.onerror = logerr;

			request.onsuccess = () => {
				return;
			}
		});

	}

	// === STATIC METHOD ===
	static createConnect() {
		return new IDB();
	}
}

const idb = IDB.createConnect();

if (!idb.indexedDB) {
	window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

// Uncomment this and run app for delete DB
// let DBDeleteRequest = window.indexedDB.deleteDatabase(DB_NAME);
//
// DBDeleteRequest.onerror = function(event) {
// 	console.log("Error deleting database.");
// };
//
// DBDeleteRequest.onsuccess = function(event) {
// 	console.log("Database deleted successfully");
// 	console.log(request.result); // should be null
// };

export default idb;