import api from "@/api/factory/apiFactory";

export const getBankSlip = async (digitableLine: string) => {
    const { data } = await api.get(digitableLine);
      
    return data;
}