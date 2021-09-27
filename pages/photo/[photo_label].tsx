import React, { memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as Types from "@/assets/ts/types/types";
import * as Photos from "@/assets/ts/images";
import LoadingModal from "@/components/photo_label/LoadingModal";
import ViewPhotoElment from "@/components/photo_label/ViewPhotoElment";

const all_photos = Photos.all_photos;

const PhotoLabel: React.FC = () => {
  const route = useRouter();
  const { photo_label, id, num } = route.query;
  const [filtered_photo, setFilteredPhotos] = useState<Types.PhotoList[]>();
  const [current_photo, setCurrentPhoto] = useState<Types.PhotoList>();

  function fetchPhotoById(id: number): Types.PhotoList {
    if (!filtered_photo) return;
    return filtered_photo.find((photo) => photo.id === id);
  }

  function isValidPhotoIndex(index: number): boolean {
    if (Number.isNaN(index)) return false;
    if (filtered_photo) {
      const lng = filtered_photo.length;
      return 0 <= index && index < lng;
    }
    return false;
  }

  function isValidPhotoId(id: number): boolean {
    if (Number.isNaN(id)) return false;

    return filtered_photo.some((photo) => photo.id === id);
  }

  function validatePhotoId(id: number): void {
    if (!isValidPhotoId(id)) route.push(`/photo/${photo_label}?num=1`);
    setCurrentPhoto(fetchPhotoById(id));
  }

  function validatePhotoIndex(index: number): void {
    const inner_index = index - 1;
    if (!isValidPhotoIndex(inner_index)) {
      route.push(`/photo/${photo_label}?num=1`);
      return;
    }
    setCurrentPhoto(filtered_photo[inner_index]);
  }

  //route.query の photo_label でフィルターした写真を filtered_photo に更新
  useEffect(() => {
    if (!photo_label) return;
    const photos = all_photos.filter((photo) => {
      return photo.label.toLocaleLowerCase() === photo_label;
    });
    setFilteredPhotos(photos);
  }, [photo_label]);

  // route.query で受け取る値で表示する写真を変える
  useEffect(() => {
    if (!Object.keys(route.query).length) return;
    if (!filtered_photo) return;
    if (!filtered_photo.length) {
      route.push(`/`);
      return;
    }
    if (!id && !num) return setCurrentPhoto(filtered_photo[0]);
    if (id) return validatePhotoId(Number(id));
    if (num) return validatePhotoIndex(Number(num));
  }, [filtered_photo, id, num]);

  return (
    <>
      {filtered_photo ? (
        filtered_photo.map(
          (el) =>
            current_photo &&
            current_photo.id === el.id && (
              <ViewPhotoElment
                key={el.id}
                src={el.src}
                alt={el.alt}
                filtered_photo={filtered_photo}
                current_photo={current_photo}
                photo_label={photo_label}
              />
            )
        )
      ) : (
        <LoadingModal />
      )}
    </>
  );
};

export default memo(PhotoLabel);
