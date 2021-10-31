// const DESIGN = "open-peeps"
const DESIGN = "adventurer"

let randomAvatar = (userAccount: string) => {return `https://avatars.dicebear.com/api/${DESIGN}/${userAccount}.svg`}

export {
    randomAvatar
}