export interface User {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userCity: string;
  userGender: string;
  userLikedProducts: { prodId: string; message: string };
}
