function FriendsGen(){
    createApp({
        data() {
            linkname: LinkData.friends.name;
            linkdescr: LinkData.friends.description
        }
    }).mount('#VueContrainer')
}
module.exports = FriendsGen;