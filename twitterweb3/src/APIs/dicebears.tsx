const DESIGN = "open-peeps"

let randomAvatar = (userAccount: string) => {return `https://avatars.dicebear.com/api/${DESIGN}/${userAccount}.svg`}

export {
    randomAvatar
}