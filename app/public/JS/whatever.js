const SomeApp = {
    data() {
      return {
        "students": [],
        "offerForm": {},
        "offers":[],
        selectedOffer : null
      }
    },
    computed: {},
    methods: {
        fetchStudentData() {
            fetch('/api/student/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.students = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchUserData() {
            //Method 1:
            fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then((json) => {
                console.log("Got json back:", json);
                this.result = json.results[0];
                console.log("C");
            })
            .catch( (error) => {
                console.error(error);
            });
    },
    postOffer(evt) {
      if (this.selectedOffer === null) {
          this.postNewOffer(evt);
      } else {
          this.postEditOffer(evt);
      }
    },
    postNewOffer(evt) {        
        
        console.log("Posting!", this.offerForm);
        alert("Posting!");
        fetch('api/student/create.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.students = json;
            
            // reset the form
            this.offerForm = {};
            this.resetOfferForm();

          });
      },
      postEditOffer(evt) {
        // this.offerForm.studentId = this.selectedStudent.id;
        this.offerForm.id = this.selectedOffer.id;

        // console.log("Updating!", this.offerForm);

        fetch('api/student/update.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.students = json;

            // reset the form
            this.resetOfferForm();
          });
      },

      postDeleteOffer(o) {
        if (!confirm("Are you sure you want to delete "+o.title+"?")) {
          return;
        }
        console.log("Delete!", o);

        fetch('api/student/delete.php', {
            method:'POST',
            body: JSON.stringify(o),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.students = json;

            // reset the form
            this.resetOfferForm();
          });
      },

      selectOfferToEdit(o) {
          this.selectedOffer = o;
          this.offerForm = Object.assign({}, this.selectedOffer);
      },

      resetOfferForm() {
          this.selectedOffer = null;
          this.offerForm = {};
      }

  },
    created() {
        this.fetchStudentData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#offerApp');