import type { Advertisement, PagedData } from "../model/advertisement.model";

const baseUrl =  !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://192.168.0.103:5006/" : "/";
class ApiService {
  public advertisements: Advertisement[] = [
    {
      name: "Rupert",
      age: "28",
      place: "City",
      content:
        "Adventure seeker and coffee enthusiast looking for someone to explore the world with. Love hiking, photography, and trying new restaurants.",
      email: "mail@mail.com",
      phone: "+370",
      category: "mf",
      showPhone: false,
    },
    {
      name: "Sarah",
      age: "28",
      place: "City",
      content:
        "Adventure seeker and coffee enthusiast looking for someone to explore the world with. Love hiking, photography, and trying new restaurants.",
      email: "mail@mail.com",
      phone: "+370",
      category: "mf",
      showPhone: true,
    },
  ];

  getUser(id: number) {
    return fetch(`/api/users/${id}`).then((r) => r.json());
  }

  async geAdvertisements(
    page: number,
    category: string
  ): Promise<PagedData<Advertisement>> {
    const adds = fetch(
      `${baseUrl}api/advertisements?page=${page}&category=${category}`
    )
      .then((r) => r.json() as Promise<PagedData<Advertisement>>)
      .then((data) => {
        return data;
      });
    return adds;
  }

  addAdvertisement(advertisement: Advertisement): Promise<Advertisement> {
    const resp = fetch(`${baseUrl}api/advertisements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(advertisement),
    }).then((r) => r.json() as Promise<Advertisement>);
    return resp;
    this.advertisements.unshift(advertisement);
  }

  confirmAdvertisementByCode(code: string): Promise<{ success: boolean }> {
    const resp = fetch(
      `${baseUrl}api/advertisements/confirm-by-code/${code}`,
      {
        method: "POST",
        body: JSON.stringify({ code }),
      }
    ).then((r) => r.json() as Promise<{ success: boolean }>);
    return resp;
  }

  confirmAdvertisement(code: string): Promise<{ success: boolean }> {
    const resp = fetch(
      `${baseUrl}api/advertisements/confirm/${code}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((r) => r.json() as Promise<{ success: boolean }>);
    return resp;
  }

    confirmMessage(code: string): Promise<{ success: boolean }> {
    const resp = fetch(
      `${baseUrl}api/advertisements/confirm-message/${code}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((r) => r.json() as Promise<{ success: boolean }>);
    return resp;
  }

  sendMessage(
    advertisementId: string,
    content: string,
    senderEmail: string
  ): Promise<{ success: boolean }> {
    const resp = fetch(
      `${baseUrl}api/advertisements/send-message`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertisementId, content, senderEmail }),
      }
    ).then((r) => r.json() as Promise<{ success: boolean }>);
    return resp;
  }
}

export const apiService = new ApiService();
