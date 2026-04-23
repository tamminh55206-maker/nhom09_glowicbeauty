export interface TeamMember {
  name: string;
  studentId: string;
  github?: string;
  avatar: string;
  role: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Phạm Minh Tâm",
    studentId: "24126201",
    github: "https://github.com/tamminh55206-maker",
    avatar: "/images/team/minhtam.JPG",
    role: "Leader",
  },  
  {
    name: "Nguyễn Ái Quỳnh Anh",
    studentId: "24126004",
    github: "https://github.com/nguyenaiquynhanh27-hash",
    avatar: "/images/team/quynhanh.JPG",
    role: "Member",
  },
  {
    name: "Huỳnh Thị Yến Nhi",
    studentId: "24126162",
    github: "https://github.com/yennhi124",
    avatar: "/images/team/yennhi.jpg",
    role: "Member",
  },
  {
    name: "Nguyễn Thị Trà Mi",
    studentId: "24126131",
    github: "https://github.com/trami3004",
    role: "Member", 
    avatar: "/images/team/trami.jpg",
  },
  {
    name: "Lương Thị Nguyệt",
    studentId: "24126158",
    github: "https://github.com/luongthinguyet32-af",   
    avatar: "/images/team/nguyet.jpg",
    role: "Member",
  },
  {
    name: "Đinh Nhật Huy",
    studentId: "24126084",
    github: "https://github.com/DinhHuy18",
    avatar: "/images/team/nhathuy.jpg",
    role: "Member",

  },
  {
    name: "Bùi Khang Huy",
    studentId: "24126083",
    github: "https://github.com/khanghuy01012006-stack",
    avatar: "/images/team/khanghuy.jpg",
    role: "Member",
  },
];