package studiduell.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import studiduell.model.SpielEntity;
import studiduell.model.SpielstatusEntity;
import studiduell.model.UserEntity;

public interface SpielRepository extends JpaRepository<SpielEntity, Integer> {
	@Query("SELECT COUNT(*) FROM SpielEntity s WHERE ((s.spieler1 = :user AND s.spieler2 = :opponent) OR (s.spieler1 = :opponent AND s.spieler2 = :user)) AND s.spielstatusName IN (:status)")
	Integer getWithUserAndOpponentInStatus(@Param("user") UserEntity user,
			@Param("opponent") UserEntity opponent, @Param("status") List<SpielstatusEntity> spielstatus);
	
	@Query("FROM SpielEntity s WHERE (s.spieler1 = :player OR s.spieler2 = :player) AND s.spielstatusName IN (:status)")
	List<SpielEntity> getWithUserInStatus(@Param("player") UserEntity spieler, @Param("status") List<SpielstatusEntity> spielstatus);
	
	@Query("FROM SpielEntity s WHERE (s.spieler1 = :player OR s.spieler2 = :player) AND s.spielstatusName IN (:status) ORDER BY s.spielID DESC")
	Page<SpielEntity> getWithUserInStatusOrderBySpielIDDesc(@Param("player") UserEntity spieler, @Param("status") List<SpielstatusEntity> spielstatus, Pageable pageable);
}
