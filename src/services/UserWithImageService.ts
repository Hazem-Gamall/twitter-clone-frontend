import { HttpService } from "./HttpService";

class UserWithImageService extends HttpService {
  _convertToFormData(data: any) {
    const formData = new FormData();
    console.log(data.avatar);

    data.avatar.length > 0 && formData.append("avatar", data.avatar[0]);
    data.cover_picture.length > 0 &&
      formData.append("cover_picture", data.cover_picture[0]);
    data.bio && formData.append("bio", data.bio);
    formData.append("date_of_birth", data.date_of_birth);
    formData.append("user.name", data.user?.name);
    return formData;
  }
  patch<T>(id: string, data: T) {
    console.log("new patch");

    const controller = new AbortController();
    const formData = this._convertToFormData(data);
    const request = this.apiClient.patch(`${this.endpoint}/${id}/`, formData, {
      signal: controller.signal,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default UserWithImageService;
